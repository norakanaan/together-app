import Flow from './flow-client';

export const dynamicParams = false;
export function generateStaticParams() {
  return [
    { sessionId: 'demo', stage: 'partner-a' },
    { sessionId: 'demo', stage: 'partner-b' },
    { sessionId: 'demo', stage: 'summary' },
    { sessionId: 'demo', stage: 'conversation' },
  ];
}

export default function Page({ params }: { params: Promise<{ sessionId: string; stage: string }> }) {
  return <Flow params={params} />;
}
