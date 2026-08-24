import { actions, questions } from './questions';
import { CheckInSession } from './types';

export const relationshipAdvice = [
  'Protect a small weekly ritual that belongs only to the two of you. Long-term closeness is often built in ordinary, repeatable moments.',
  'Ask what has changed for each of you recently, rather than assuming you already know. A long relationship still needs fresh curiosity.',
  'Make room for both continuity and growth: name one tradition to keep and one new experience to try together.',
  'When life gets busy, describe the pressure as a shared challenge instead of treating each other as the problem.',
  'Keep appreciation specific and current. Tell each other what you noticed, not only what you have valued in the past.',
  'Return to unfinished conversations gently. Repair does not require perfect words—just a willingness to come back with care.',
];

export function adviceForSession(sessionId: string) { return relationshipAdvice[[...sessionId].reduce((n, c) => n + c.charCodeAt(0), 0) % relationshipAdvice.length]; }

export interface Finding {
  category: string;
  kind: 'strength' | 'difference' | 'attention';
  text: string;
  questionId: string;
}

export function compareSession(session: CheckInSession): Finding[] {
  const findings: Finding[] = [];
  for (const id of session.questionIds) {
    const question = questions.find(item => item.id === id);
    if (!question || question.type !== 'rating') continue;
    const a = Number(session.answers.find(item => item.questionId === id && item.partnerId === 'a')?.value);
    const b = Number(session.answers.find(item => item.questionId === id && item.partnerId === 'b')?.value);
    if (!a || !b) continue;
    if (Math.abs(a - b) >= 2) findings.push({ category: question.category, kind: 'difference', text: `You experienced ${question.category.toLowerCase()} differently.`, questionId: id });
    else if (a >= 4 && b >= 4) findings.push({ category: question.category, kind: 'strength', text: `You both rated ${question.category.toLowerCase()} highly.`, questionId: id });
    else if (a <= 2 && b <= 2) findings.push({ category: question.category, kind: 'attention', text: `${question.category} may be a useful topic to explore together.`, questionId: id });
  }
  return findings;
}

export function suggestedAction(session: CheckInSession) {
  return actions[Math.abs([...session.id].reduce((sum, char) => sum + char.charCodeAt(0), 0)) % actions.length];
}

export function conversationCards(session: CheckInSession) {
  const findings = compareSession(session);
  const source: Finding[] = findings.length ? findings : [{ category: 'Your reflections', kind: 'strength', text: 'You have both made space to reflect.', questionId: 'connection' }];
  const cards = source.map(finding => ({ observation: finding.text, question: `What would you like each other to understand about ${finding.category.toLowerCase()}?`, reminder: 'Try to understand before trying to solve.' }));
  return [...cards,
    { observation: 'You have both shared your perspective.', question: 'What part of your partner’s answer would you like to understand a little more?', reminder: 'Ask one curious follow-up before offering your own view.' },
    { observation: 'A small moment of connection can shape the week ahead.', question: 'What is one small thing you could try together in the next few days?', reminder: 'Keep the next step specific, mutual, and kind.' },
    { observation: 'You are choosing to stay engaged with each other.', question: 'What would help this conversation feel safe and useful to revisit?', reminder: 'You can pause, come back later, or choose one topic at a time.' },
  ];
}
