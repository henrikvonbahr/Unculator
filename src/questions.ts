export interface Question {
  text: string;
  options: { label: string; uncScore: number }[];
}

export const questions: Question[] = [
  {
    text: "Someone cuts you off in traffic. What do you do?",
    options: [
      { label: "Let it go, not worth the stress", uncScore: 0 },
      { label: "Mutter something under your breath", uncScore: 1 },
      { label: "Honk and shake your head dramatically", uncScore: 2 },
      { label: "Roll down the window and lecture them", uncScore: 3 },
    ],
  },
  {
    text: "A meal at a restaurant costs $28. Your reaction?",
    options: [
      { label: "Normal, that's fine", uncScore: 0 },
      { label: "A bit much, but okay", uncScore: 1 },
      { label: "Back in my day this cost $8", uncScore: 2 },
      { label: "You say this out loud to the waiter", uncScore: 3 },
    ],
  },
  {
    text: "What's your relationship with your back?",
    options: [
      { label: "No issues at all", uncScore: 0 },
      { label: "Occasionally stiff after long drives", uncScore: 1 },
      { label: "I have a preferred chair at home", uncScore: 2 },
      { label: "I narrate its condition to everyone", uncScore: 3 },
    ],
  },
  {
    text: "A new popular song comes on. You:",
    options: [
      { label: "Vibe with it", uncScore: 0 },
      { label: "Don't know it but it's fine", uncScore: 1 },
      { label: "Wonder why it doesn't sound like real music", uncScore: 2 },
      { label: "Ask 'what is this noise?'", uncScore: 3 },
    ],
  },
  {
    text: "How do you feel about kids these days?",
    options: [
      { label: "They're doing fine, every generation has its challenges", uncScore: 0 },
      { label: "They're a bit soft but that's okay", uncScore: 1 },
      { label: "They wouldn't last a week in my era", uncScore: 2 },
      { label: "I bring this up unprompted at gatherings", uncScore: 3 },
    ],
  },
  {
    text: "What time do you typically fall asleep on a Friday?",
    options: [
      { label: "After midnight, it's the weekend", uncScore: 0 },
      { label: "Around 11pm", uncScore: 1 },
      { label: "10pm, maybe earlier", uncScore: 2 },
      { label: "I was asleep before the news ended", uncScore: 3 },
    ],
  },
  {
    text: "Someone asks if you've seen a new Netflix show. You say:",
    options: [
      { label: "Yes! I've been binging it", uncScore: 0 },
      { label: "Not yet, heard it's good", uncScore: 1 },
      { label: "I don't really do streaming", uncScore: 2 },
      { label: "I have the same 3 DVDs I watch on rotation", uncScore: 3 },
    ],
  },
  {
    text: "At a family gathering, you are most likely to be found:",
    options: [
      { label: "Dancing or mingling with everyone", uncScore: 0 },
      { label: "Chatting by the food table", uncScore: 1 },
      { label: "In a chair giving unsolicited life advice", uncScore: 2 },
      { label: "Asleep in a corner chair after the meal", uncScore: 3 },
    ],
  },
  {
    text: "What do you do with a store receipt?",
    options: [
      { label: "Throw it away immediately", uncScore: 0 },
      { label: "Leave it in the bag and forget", uncScore: 1 },
      { label: "Keep it in my wallet for a few weeks", uncScore: 2 },
      { label: "File them at home, just in case", uncScore: 3 },
    ],
  },
  {
    text: "How do you feel about getting up early?",
    options: [
      { label: "Hate it, I'm a night person", uncScore: 0 },
      { label: "Fine if I have to", uncScore: 1 },
      { label: "I naturally wake up at 6am now", uncScore: 2 },
      { label: "I'm up at 5am and I think everyone else should be too", uncScore: 3 },
    ],
  },
];

export const MAX_SCORE = questions.reduce(
  (sum, q) => sum + Math.max(...q.options.map((o) => o.uncScore)),
  0
);
