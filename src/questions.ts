export interface Question {
  text: string;
  options: { label: string; uncScore: number }[];
}

export const QUESTIONS_PER_QUIZ = 10;

export const allQuestions: Question[] = [
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
  {
    text: "Your phone needs a software update. You:",
    options: [
      { label: "Update it immediately", uncScore: 0 },
      { label: "Do it later that evening", uncScore: 1 },
      { label: "Dismiss it for two weeks then panic", uncScore: 2 },
      { label: "Ask someone younger to handle it", uncScore: 3 },
    ],
  },
  {
    text: "How do you feel about your current shoes?",
    options: [
      { label: "Stylish and I like it that way", uncScore: 0 },
      { label: "Decent enough", uncScore: 1 },
      { label: "Comfortable is the priority now", uncScore: 2 },
      { label: "I own one pair and they are perfect", uncScore: 3 },
    ],
  },
  {
    text: "The restaurant is too loud. You:",
    options: [
      { label: "Don't notice, the vibe is great", uncScore: 0 },
      { label: "Speak a little louder, no big deal", uncScore: 1 },
      { label: "Mention it to your dining companion", uncScore: 2 },
      { label: "Ask to be moved or just leave", uncScore: 3 },
    ],
  },
  {
    text: "Someone sends you a voice note instead of a text. You:",
    options: [
      { label: "Listen to it immediately, no problem", uncScore: 0 },
      { label: "Listen to it later, a bit annoying", uncScore: 1 },
      { label: "Leave it for days and feel guilty", uncScore: 2 },
      { label: "Explain that you prefer texts and always will", uncScore: 3 },
    ],
  },
  {
    text: "How do you feel about tattoos on young people?",
    options: [
      { label: "Their body, their choice, looks cool", uncScore: 0 },
      { label: "Not my thing but whatever", uncScore: 1 },
      { label: "They'll regret it someday", uncScore: 2 },
      { label: "You've said this directly to someone with a tattoo", uncScore: 3 },
    ],
  },
  {
    text: "What's your approach to portion sizes?",
    options: [
      { label: "Whatever, I'll eat what's there", uncScore: 0 },
      { label: "I notice if something is skimpy", uncScore: 1 },
      { label: "I remember when portions were bigger", uncScore: 2 },
      { label: "I bring this up every single time", uncScore: 3 },
    ],
  },
  {
    text: "A young person uses a word you don't recognise. You:",
    options: [
      { label: "Ask what it means, genuinely curious", uncScore: 0 },
      { label: "Google it later", uncScore: 1 },
      { label: "Nod along and feel old", uncScore: 2 },
      { label: "Tell them to speak properly", uncScore: 3 },
    ],
  },
  {
    text: "What's your relationship with the thermostat?",
    options: [
      { label: "I barely think about it", uncScore: 0 },
      { label: "I have a preferred temperature", uncScore: 1 },
      { label: "I have a preferred temperature and I enforce it", uncScore: 2 },
      { label: "The thermostat is mine. Nobody touches it.", uncScore: 3 },
    ],
  },
  {
    text: "You're watching TV and an ad comes on. You:",
    options: [
      { label: "Scroll my phone, no big deal", uncScore: 0 },
      { label: "Get up to make tea", uncScore: 1 },
      { label: "Mute it on principle", uncScore: 2 },
      { label: "Complain about how ads are worse now than they used to be", uncScore: 3 },
    ],
  },
  {
    text: "How do you feel about social media?",
    options: [
      { label: "Love it, it's part of life", uncScore: 0 },
      { label: "Use it, don't love it", uncScore: 1 },
      { label: "It was better before the algorithm", uncScore: 2 },
      { label: "It's ruining society and I will explain why", uncScore: 3 },
    ],
  },
  {
    text: "Someone is walking slowly in front of you. You:",
    options: [
      { label: "Slow down, no rush", uncScore: 0 },
      { label: "Politely overtake them", uncScore: 1 },
      { label: "Sigh audibly", uncScore: 2 },
      { label: "Make a comment about people not knowing how to walk", uncScore: 3 },
    ],
  },
  {
    text: "The waiter hasn't checked on your table in a while. You:",
    options: [
      { label: "I'm fine, I'll catch their eye when I'm ready", uncScore: 0 },
      { label: "Wave gently when they pass", uncScore: 1 },
      { label: "Crane your neck looking for them repeatedly", uncScore: 2 },
      { label: "Discuss the service loudly with your table", uncScore: 3 },
    ],
  },
  {
    text: "How do you consume the news?",
    options: [
      { label: "Social media and podcasts", uncScore: 0 },
      { label: "A news app, maybe a newsletter", uncScore: 1 },
      { label: "The evening news, same channel every night", uncScore: 2 },
      { label: "The newspaper, physical copy, every morning without fail", uncScore: 3 },
    ],
  },
  {
    text: "You're asked to split the bill equally but you had less. You:",
    options: [
      { label: "Fine, it all evens out in life", uncScore: 0 },
      { label: "Quietly note it but say nothing", uncScore: 1 },
      { label: "Suggest everyone pays what they had", uncScore: 2 },
      { label: "Itemise the entire bill and explain your position", uncScore: 3 },
    ],
  },
  {
    text: "What's your honest opinion of open-plan offices?",
    options: [
      { label: "Love the energy and collaboration", uncScore: 0 },
      { label: "Fine, I use headphones", uncScore: 1 },
      { label: "People are too loud and have no focus", uncScore: 2 },
      { label: "Offices were better when everyone had their own space and respected boundaries", uncScore: 3 },
    ],
  },
];

export function pickQuestions(): Question[] {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, QUESTIONS_PER_QUIZ);
}

export function maxScore(questions: Question[]): number {
  return questions.reduce(
    (sum, q) => sum + Math.max(...q.options.map((o) => o.uncScore)),
    0
  );
}
