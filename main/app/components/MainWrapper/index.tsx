import { createContext, useEffect, useState } from "react";
import Main from "../Main";

export const IsDesktopContext = createContext(false);

export default function MainWrapper() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const _isDesktop = typeof window !== 'undefined' && window.__TAURI__ !== undefined;
        setIsDesktop(_isDesktop)
    }, [])

    return (
        <IsDesktopContext.Provider value={isDesktop}>
            <Main />
        </IsDesktopContext.Provider>
    );
}