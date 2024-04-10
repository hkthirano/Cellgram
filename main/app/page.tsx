"use client"

import { useEffect, useState } from 'react';

import Main2 from './components/main2';
import { Provider } from './state';

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const _isDesktop = typeof window !== 'undefined' && window.__TAURI__ !== undefined;
    setIsDesktop(_isDesktop)
  }, [])

  return (
    <Provider isDesktop={isDesktop}>
      <Main2 />
    </Provider>
  );
}
