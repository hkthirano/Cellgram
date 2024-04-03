'use client'

import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri'

export default function Greet() {
    const [isDesktop, setIsDesktop] = useState(false);
    const [greeting, setGreeting] = useState('init');

    useEffect(() => {
        if (window.__TAURI__ !== undefined) setIsDesktop(true);
    }, [])

    useEffect(() => {
        if (!isDesktop) return;

        invoke<string>('greet', { name: 'Next.js' })
            .then(result => setGreeting(result))
            .catch(console.error)
    }, [isDesktop])

    // Necessary because we will have to use Greet as a component later.
    return <div>{greeting}</div>;
}