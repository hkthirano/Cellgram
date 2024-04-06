import { createContext, useEffect, useState } from "react";
import Header from "../Header";
import Content from "../Content";

export const IsDesktopContext = createContext(false);

export default function Main() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const _isDesktop = typeof window !== 'undefined' && window.__TAURI__ !== undefined;
        setIsDesktop(_isDesktop)
    }, [])

    return (
        <IsDesktopContext.Provider value={isDesktop}>
            <Header />

            <Content />
        </IsDesktopContext.Provider>
    );
}