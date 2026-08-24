'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { Shell, Button } from '@/components/ui';

const questionSets = [[
  'What was a small moment from today that you would like to share with me?',
  'What is something we have been enjoying together lately?',
  'What is one ordinary ritual in our life that you hope we keep?',
  'When do you feel most at ease and most yourself with me?',
  'What have you learned about yourself during our years together?',
  'What season of our relationship changed you in a meaningful way?',
  'What do you think we handle better now than we used to?',
  'Is there a dream or curiosity you would like us to make more room for?',
  'What part of our future feels especially worth protecting?',
  'If we looked back on this chapter years from now, what would you hope we remembered about how we loved each other?',
], [
  'What is something you would love to celebrate about our life right now?',
  'Which place, meal, or song always brings back a good memory for you?',
  'What helps you feel close to me during a busy week?',
  'What is a quality in me that you have come to appreciate more over time?',
  'How have our ideas about home or belonging changed as we have grown?',
  'What challenge taught us something important about being a team?',
  'Where could we give each other a little more freedom or encouragement?',
  'What would you like us to be brave enough to try together?',
  'What do you want more of in the next chapter of our shared life?',
  'What is one promise about how we treat each other that feels worth renewing?',
]];

export default function TogetherQuestions() {
  const [questionSetIndex, setQuestionSetIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const questions = questionSets[questionSetIndex];
  return <Shell back="/">
    <section className="conversation spoken-questions">
      <div className="eyebrow">SIT TOGETHER · {index + 1} OF {questions.length}</div>
      <div className="progress"><i style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
      <span className="round-icon"><MessageCircle /></span>
      <small>ASK EACH OTHER</small>
      <h2>Take turns answering out loud.</h2>
      <div className="conversation-q"><span>QUESTION {index + 1}</span><h1>{questions[index]}</h1></div>
      <p className="listen">Let the answer land before responding.</p>
      <div className="spoken-actions">
        <Button variant="quiet" disabled={index === 0} onClick={() => setIndex(index - 1)}><ArrowLeft /> Previous</Button>
        {index < questions.length - 1 ? <Button onClick={() => setIndex(index + 1)}>Next question <ArrowRight /></Button> : <><Button variant="secondary" onClick={() => { setQuestionSetIndex((questionSetIndex + 1) % questionSets.length); setIndex(0); }}>10 more questions <ArrowRight /></Button><Link className="btn quiet" href="/">Done</Link></>}
      </div>
      <Link className="text-button" href="/">Back to our space</Link>
      <details><summary>Listening reminders</summary><p>Speak from your own experience. Avoid interrupting. Ask a curious follow-up. You can always take a pause.</p></details>
    </section>
  </Shell>;
}
