'use client'

import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { invoke } from '@tauri-apps/api/tauri'

export default function LsButton() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        if (window.__TAURI__ !== undefined) setIsDesktop(true);
    }, [])

    const handleClick = () => {
        if (!isDesktop) return;

        invoke<string>('ls')
            .then(result => console.log(result))
            .catch(console.error)
    }

    return <Button variant="contained" onClick={handleClick}>Hello world</Button>;
}