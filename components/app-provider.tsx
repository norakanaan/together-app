'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { AppData, CheckInSession } from '@/lib/types';
import { defaults, load, save } from '@/lib/storage';

type AppContext = {
  data: AppData;
  ready: boolean;
  setData: (data: AppData) => void;
  updateSession: (session: CheckInSession) => void;
  clear: () => void;
};

const Context = createContext<AppContext | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [data, setState] = useState<AppData>(defaults);
  useEffect(() => setState(load()), []);

  const setData = (next: AppData) => {
    setState(next);
    save(next);
  };
  const updateSession = (session: CheckInSession) => setData({ ...data, sessions: [...data.sessions.filter(item => item.id !== session.id), session] });
  const clear = () => {
    localStorage.removeItem('together.app.v1');
    setState(structuredClone(defaults));
  };

  return <Context.Provider value={{ data, ready: true, setData, updateSession, clear }}>{children}</Context.Provider>;
}

export const useApp = () => {
  const context = useContext(Context);
  if (!context) throw Error('Missing provider');
  return context;
};
