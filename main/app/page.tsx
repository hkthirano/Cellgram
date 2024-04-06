"use client"

import { createContext } from 'react';
import Header from './components/common/Header';
import Main from './components/common/Main';

const isDesktop = typeof window !== 'undefined' && window.__TAURI__ !== undefined;
export const IsDesktopContext = createContext(isDesktop);

export default function Home() {
  return (
    <IsDesktopContext.Provider value={isDesktop}>
      <main>
        <Header />

        <Main />
      </main>
    </IsDesktopContext.Provider>
  );
}
