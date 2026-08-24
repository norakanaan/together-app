import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/components/app-provider';

export const metadata: Metadata = { title: 'Together — relationship reflection', description: 'A private space for honest reflection and stronger connection.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body><style>{`.actions-stack{flex-direction:column;max-width:360px;margin-left:auto;margin-right:auto}.actions-stack .btn{width:100%}.actions-stack .together-cta{background:#b87958;box-shadow:0 8px 24px #b8795840}.actions-stack .together-cta:hover{background:#9e6044}.actions-stack .btn.secondary{margin-top:28px}.topnav{display:flex;gap:18px;align-items:center}.flow-menu{font-weight:600;color:var(--sage-dark)}`}</style><AppProvider>{children}</AppProvider></body></html> }
