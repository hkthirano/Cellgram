import { useContext, useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri'
import { IsDesktopContext } from './page';

export default function Greet() {
    const isDesktop = useContext(IsDesktopContext);
    const [greeting, setGreeting] = useState('init');

    useEffect(() => {
        if (!isDesktop) return;

        invoke<string>('greet', { name: 'Next.js' })
            .then(result => setGreeting(result))
            .catch(console.error)
    }, [])

    // Necessary because we will have to use Greet as a component later.
    return <div>{greeting}</div>;
}