import { createContext, useEffect, useState } from "react";
import Header from "../Header";
import Content from "../Content";

export const IsDesktopContext = createContext(false);

export default function Main() {
    const [isDesktop, setIsDesktop] = useState(false);
    const [base64, setBase64] = useState<string>('');

    useEffect(() => {
        const _isDesktop = typeof window !== 'undefined' && window.__TAURI__ !== undefined;
        setIsDesktop(_isDesktop)
    }, [])

    const onSetBase64 = (base64: string) => {
        console.log(base64)
        setBase64(base64)
    }

    return (
        <IsDesktopContext.Provider value={isDesktop}>
            <Header onSetBase64={onSetBase64} />

            <Content base64={base64} />
        </IsDesktopContext.Provider>
    );
}