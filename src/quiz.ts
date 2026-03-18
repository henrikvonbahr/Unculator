import { questions, MAX_SCORE } from "./questions.js";

type Step = "intro" | "age" | "question" | "result";

interface QuizState {
  step: Step;
  age: number | null;
  currentQuestion: number;
  answers: number[];
  finalPercentage: number | null;
}

const state: QuizState = {
  step: "intro",
  age: null,
  currentQuestion: 0,
  answers: [],
  finalPercentage: null,
};

function reset() {
  state.step = "intro";
  state.age = null;
  state.currentQuestion = 0;
  state.answers = [];
  state.finalPercentage = null;
}

function getUncTitle(percentage: number, age: number): string {
  if (percentage >= 85) return "Certified Unc";
  if (percentage >= 70) return "Full-Blown Unc";
  if (percentage >= 55) return "Unc in Training";
  if (percentage >= 40) return "Unc-Adjacent";
  if (percentage >= 25) return "Unc Curious";
  if (age >= 50 && percentage < 25) return "Reverse Unc (suspiciously youthful)";
  return "Not an Unc";
}

function getUncMessage(percentage: number): string {
  if (percentage >= 85)
    return "You have fully ascended. You own at least one polo shirt tucked into khakis and have strong opinions about lawn care.";
  if (percentage >= 70)
    return "You're deep in unc territory. You've said 'back in my day' at least once this month and meant it.";
  if (percentage >= 55)
    return "You're getting there. The unc is strong but you still occasionally pretend to like new things.";
  if (percentage >= 40)
    return "Unc-adjacent. You have unc tendencies but can still pass in polite society.";
  if (percentage >= 25)
    return "Some unc energy detected. You're young at heart but the signs are emerging.";
  return "Barely an unc. You're either very young, very chill, or deeply in denial.";
}

function calcResult(age: number): number {
  const totalScore = state.answers.reduce((sum, s) => sum + s, 0);
  const ageBonus = Math.min(10, Math.max(0, (age - 30) * 0.4));
  const raw = (totalScore / MAX_SCORE) * 100;
  return Math.min(100, Math.round(raw + ageBonus));
}

// ─── Render helpers ──────────────────────────────────────────────────────────

function renderIntro(): string {
  return `
    <div class="card">
      <div class="intro-logo">👴</div>
      <h1 class="intro-title">The Unculator</h1>
      <p class="intro-subtitle">
        10 questions. One verdict.<br>
        Find out exactly how much of an unc you are.
      </p>
      <button class="btn" id="btn-start">Find out</button>
    </div>
  `;
}

function renderAge(): string {
  return `
    <div class="card">
      <label class="age-label" for="age-input">How old are you?</label>
      <input
        id="age-input"
        class="age-input"
        type="number"
        min="1"
        max="120"
        placeholder="Enter your age"
        autofocus
      />
      <p class="error-msg" id="age-error"></p>
      <button class="btn" id="btn-age-next">Next</button>
    </div>
  `;
}

function renderQuestion(index: number): string {
  const q = questions[index]!;
  const progress = Math.round((index / questions.length) * 100);
  const optionsHtml = q.options
    .map(
      (opt, i) => `
        <button class="option-btn" data-score="${opt.uncScore}" data-index="${i}">
          ${opt.label}
        </button>
      `
    )
    .join("");

  return `
    <div class="card">
      <div class="progress-wrap">
        <div class="progress-meta">
          <span>Question ${index + 1} of ${questions.length}</span>
          <span>${progress}%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${progress}%"></div>
        </div>
      </div>
      <p class="question-text">${q.text}</p>
      <div class="options">${optionsHtml}</div>
    </div>
  `;
}

function renderResult(): string {
  const age = state.age!;
  const pct = state.finalPercentage!;
  const title = getUncTitle(pct, age);
  const message = getUncMessage(pct);

  return `
    <div class="card">
      <p class="result-label">Your unc score</p>
      <p class="result-percentage">${pct}%</p>
      <div class="result-bar-wrap">
        <div class="result-bar-fill" id="result-bar" style="width: 0%"></div>
      </div>
      <p class="result-verdict">${title}</p>
      <p class="result-message">${message}</p>
      <div class="btn-row">
        <button class="btn btn-ghost" id="btn-retry">Try again</button>
      </div>
    </div>
  `;
}

// ─── Event wiring ─────────────────────────────────────────────────────────────

function attachListeners(app: HTMLElement) {
  if (state.step === "intro") {
    app.querySelector("#btn-start")?.addEventListener("click", () => {
      state.step = "age";
      render(app);
    });
  }

  if (state.step === "age") {
    const input = app.querySelector<HTMLInputElement>("#age-input");
    const errorEl = app.querySelector<HTMLElement>("#age-error");

    function submitAge() {
      const val = parseInt(input?.value ?? "");
      if (isNaN(val) || val < 1 || val > 120) {
        input?.classList.add("error");
        if (errorEl) errorEl.textContent = "Please enter a valid age (1–120).";
        return;
      }
      state.age = val;
      state.step = "question";
      render(app);
    }

    app.querySelector("#btn-age-next")?.addEventListener("click", submitAge);
    input?.addEventListener("keydown", (e) => {
      if ((e as KeyboardEvent).key === "Enter") submitAge();
    });
    input?.addEventListener("input", () => {
      input.classList.remove("error");
      if (errorEl) errorEl.textContent = "";
    });
  }

  if (state.step === "question") {
    app.querySelectorAll<HTMLButtonElement>(".option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const score = parseInt(btn.dataset["score"] ?? "0");
        state.answers.push(score);

        if (state.currentQuestion < questions.length - 1) {
          state.currentQuestion++;
          render(app);
        } else {
          state.finalPercentage = calcResult(state.age!);
          state.step = "result";
          render(app);
        }
      });
    });
  }

  if (state.step === "result") {
    app.querySelector("#btn-retry")?.addEventListener("click", () => {
      reset();
      render(app);
    });

    // Animate bar after mount
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const bar = app.querySelector<HTMLElement>("#result-bar");
        if (bar) bar.style.width = `${state.finalPercentage}%`;
      });
    });
  }
}

// ─── Main render ──────────────────────────────────────────────────────────────

export function render(app: HTMLElement) {
  switch (state.step) {
    case "intro":    app.innerHTML = renderIntro(); break;
    case "age":      app.innerHTML = renderAge(); break;
    case "question": app.innerHTML = renderQuestion(state.currentQuestion); break;
    case "result":   app.innerHTML = renderResult(); break;
  }
  attachListeners(app);
}
