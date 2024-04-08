"use client"

import { useEffect, useState } from 'react';

import Main from './components/Main';
import { Provider } from './state';

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const _isDesktop = typeof window !== 'undefined' && window.__TAURI__ !== undefined;
    setIsDesktop(_isDesktop)
  }, [])

  return (
    <Provider isDesktop={isDesktop}>
      <Main />
    </Provider>
  );
}
