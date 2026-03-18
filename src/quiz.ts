import { type Question, pickQuestions, maxScore, QUESTIONS_PER_QUIZ } from "./questions.js";

type Step = "intro" | "age" | "question" | "result";

interface QuizState {
  step: Step;
  age: number | null;
  questions: Question[];
  currentQuestion: number;
  answers: number[];
  finalPercentage: number | null;
}

const state: QuizState = {
  step: "intro",
  age: null,
  questions: [],
  currentQuestion: 0,
  answers: [],
  finalPercentage: null,
};

function reset() {
  state.step = "intro";
  state.age = null;
  state.questions = [];
  state.currentQuestion = 0;
  state.answers = [];
  state.finalPercentage = null;
}

interface Person {
  name: string;
  note: string;
}

interface VerdictDef {
  title: string;
  description: string;
  people: Person[];
}

interface Verdict {
  title: string;
  description: string;
  person: Person;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

const VERDICTS: VerdictDef[] = [
  {
    title: "Certified Unc",
    description: "You have fully ascended. You complain about prices unprompted, have a preferred chair nobody else is allowed to sit in, and refer to any music made after 1997 as 'noise'. Your opinions on the youth are both strong and unsolicited. You are the unc.",
    people: [
      { name: "Danny DeVito", note: "Permanently irritated, zero filter, somehow still the funniest person in the room. A role model." },
      { name: "Morgan Freeman", note: "Will narrate your bad decisions in a soothing voice while absolutely judging you." },
      { name: "Whoopi Goldberg", note: "Has seen it all, is tired of explaining it, and will tell you exactly what she thinks whether you asked or not." },
      { name: "Samuel L. Jackson", note: "Strong opinions on everything, delivers them at volume, and has been right every single time." },
    ],
  },
  {
    title: "Full-Blown Unc",
    description: "Deep in unc territory. You've said 'back in my day' at least once this month and meant it. You have strong opinions about the correct way to do things and aren't afraid to share them at the dinner table. The transformation is nearly complete.",
    people: [
      { name: "Jack Nicholson", note: "Intense, opinionated, convinced he's always the smartest person in the room — and honestly? He usually is." },
      { name: "Al Pacino", note: "Everything is a speech. Every conversation escalates. There is no small talk, only monologues." },
      { name: "Meryl Streep", note: "Effortlessly superior, has a 'correct' way to do everything, and isn't afraid to let you know." },
      { name: "Denzel Washington", note: "Commands the room by simply existing, gives advice nobody asked for, and it's always correct." },
    ],
  },
  {
    title: "Unc in Training",
    description: "The unc is strong in you but you still occasionally pretend to like new things. You know all the words to songs nobody else remembers, you've started going to bed earlier than you'd admit, and you've developed a suspicious interest in the weather.",
    people: [
      { name: "Will Smith", note: "Started as the cool one, slowly revealing layers of 'I need to speak to the manager' energy. A cautionary tale." },
      { name: "Jennifer Lopez", note: "Technically ageless, but the energy of someone who has a 47-step morning routine and needs everyone to know about it." },
      { name: "Idris Elba", note: "Deeply cool on the surface, but there's a man underneath who has strong opinions about the right way to make jollof rice." },
      { name: "Sandra Bullock", note: "Charming and fun until something is done the wrong way — then absolutely not." },
    ],
  },
  {
    title: "Unc-Adjacent",
    description: "You have genuine unc tendencies but can still pass in polite society. You're the person who orders 'something simple' at a trendy restaurant and quietly judges everyone who orders the tasting menu.",
    people: [
      { name: "George Clooney", note: "Distinguished, a little set in his ways, insists his opinions are just 'common sense'. Unc energy in a tailored suit." },
      { name: "Halle Berry", note: "Looks 35, is deeply tired of your nonsense, and has a bedtime she is serious about." },
      { name: "Cate Blanchett", note: "Sophisticated enough to hide it, but underneath there's someone who thinks everything was better before." },
      { name: "Chiwetel Ejiofor", note: "Measured, composed, quietly judging your life choices from a great height." },
    ],
  },
  {
    title: "Unc Curious",
    description: "Some unc energy detected but you're still fighting it. You've caught yourself saying 'kids these days' and immediately felt shame. The seeds are planted. Give it time.",
    people: [
      { name: "Ryan Reynolds", note: "Technically young, definitely doing dad humour, one bad night's sleep away from complaining about portion sizes." },
      { name: "Mindy Kaling", note: "Pop-culture-fluent but also has very firm opinions about work ethic and would like to share them." },
      { name: "Donald Glover", note: "Genuinely cool but increasingly willing to explain at length why everything was better in 2013." },
      { name: "Priyanka Chopra", note: "High achiever with the energy of someone who has never once been late and quietly resents those who are." },
    ],
  },
];

const REVERSE_UNC: VerdictDef = {
  title: "Reverse Unc",
  description: "You are old enough to be a full unc but somehow you've sidestepped it entirely. Either you're lying, you're genuinely ageless, or you've achieved some kind of spiritual enlightenment the rest of us haven't accessed yet.",
  people: [
    { name: "Keanu Reeves", note: "Has been alive since the dawn of time, still acts like a 25-year-old who just discovered skateboarding. An inspiration." },
    { name: "Jennifer Aniston", note: "Biologically frozen in 1997, somehow gets cooler every year, refuses to behave her age in the best possible way." },
    { name: "Pharrell Williams", note: "Scientists have studied him. They have no answers. He is simply built different." },
    { name: "Angela Bassett", note: "Gets more powerful with each passing year. Not an unc. Transcendent." },
  ],
};

const NOT_AN_UNC: VerdictDef = {
  title: "Not an Unc",
  description: "Barely an unc. You're either very young, refreshingly unbothered, or you answered every question wrong on purpose. Either way you have no business being here — go touch grass and come back in ten years.",
  people: [
    { name: "Timothée Chalamet", note: "The physical opposite of an unc. Eats strange things, wears stranger things, has never once complained about a price." },
    { name: "Zendaya", note: "Somehow both 25 and a seasoned industry veteran. Has no unc in her. Not a single cell." },
    { name: "Bad Bunny", note: "Completely unbothered, perpetually in the moment, would never waste energy complaining about the youth." },
    { name: "Billie Eilish", note: "Was born already too cool for everything. The concept of 'unc' does not apply." },
  ],
};

function getVerdict(percentage: number, age: number): Verdict {
  let def: VerdictDef;
  if (percentage >= 85)      def = VERDICTS[0]!;
  else if (percentage >= 70) def = VERDICTS[1]!;
  else if (percentage >= 55) def = VERDICTS[2]!;
  else if (percentage >= 40) def = VERDICTS[3]!;
  else if (percentage >= 25) def = VERDICTS[4]!;
  else if (age >= 50)        def = REVERSE_UNC;
  else                       def = NOT_AN_UNC;

  return { title: def.title, description: def.description, person: pickRandom(def.people) };
}

function calcResult(age: number): number {
  const totalScore = state.answers.reduce((sum, s) => sum + s, 0);
  const ageBonus = Math.min(10, Math.max(0, (age - 25) * 0.4));
  const raw = (totalScore / maxScore(state.questions)) * 100;
  return Math.min(100, Math.round(raw + ageBonus));
}

// ─── Render helpers ──────────────────────────────────────────────────────────

function renderIntro(): string {
  return `
    <div class="card">
      <div class="intro-eyebrow">The Official Test</div>
      <span class="intro-logo">👴</span>
      <h1 class="intro-title">The Unculator</h1>
      <p class="intro-subtitle">
        10 questions. One verdict.<br>
        Find out exactly how much of an unc you are.
      </p>
      <div class="intro-divider"></div>
      <button class="btn" id="btn-start">Find out →</button>
    </div>
  `;
}

function renderAge(): string {
  return `
    <div class="card">
      <label class="age-label" for="age-input">First — how old are you?</label>
      <div class="age-input-wrap">
        <input
          id="age-input"
          class="age-input"
          type="number"
          min="1"
          max="120"
          placeholder="Your age"
          autofocus
        />
      </div>
      <p class="error-msg" id="age-error"></p>
      <button class="btn" id="btn-age-next">Continue →</button>
    </div>
  `;
}

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out;
}

function renderQuestion(index: number): string {
  const q = state.questions[index]!;
  const progress = Math.round((index / QUESTIONS_PER_QUIZ) * 100);
  const letters = ["A", "B", "C", "D"];
  const optionsHtml = shuffle(q.options)
    .map(
      (opt, i) => `
        <button class="option-btn" data-score="${opt.uncScore}">
          <span class="option-letter">${letters[i]}</span>
          ${opt.label}
        </button>
      `
    )
    .join("");

  return `
    <div class="card">
      <div class="progress-wrap">
        <div class="progress-meta">
          <span class="progress-label">Question ${index + 1} of ${QUESTIONS_PER_QUIZ}</span>
          <span class="progress-count">${progress}%</span>
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
  const { title, description, person } = getVerdict(pct, age);

  return `
    <div class="card">
      <div class="result-header">
        <p class="result-label">Your unc score</p>
        <p class="result-percentage">${pct}%</p>
        <div class="result-bar-wrap">
          <div class="result-bar-fill" id="result-bar" style="width: 0%"></div>
        </div>
      </div>
      <p class="result-verdict">${title}</p>
      <p class="result-message">${description}</p>
      <div class="result-actor">
        <span class="result-actor-label">Your unc equivalent</span>
        <span class="result-actor-name">${person.name}</span>
        <span class="result-actor-note">${person.note}</span>
      </div>
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
      state.questions = pickQuestions();
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

        if (state.currentQuestion < QUESTIONS_PER_QUIZ - 1) {
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
