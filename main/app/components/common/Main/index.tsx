import { createContext, useEffect, useState } from "react";
import Header from "../Header";
import Content from "../Content";

export const IsDesktopContext = createContext(false);

export default function Main() {
    const [isDesktop, setIsDesktop] = useState(false);
    const [base64, setBase64] = useState<string>('');
    const [myImage, setMyImage] = useState<number[] | null>(null);

    useEffect(() => {
        const _isDesktop = typeof window !== 'undefined' && window.__TAURI__ !== undefined;
        setIsDesktop(_isDesktop)
    }, [])

    const onSetBase64 = (base64: string) => {
        setBase64(base64)
    }

    const onSetImage = (myImage: number[]) => {
        setMyImage(myImage)
    }

    return (
        <IsDesktopContext.Provider value={isDesktop}>
            <Header onSetBase64={onSetBase64} onSetImage={onSetImage} />

            {myImage && <Content base64={base64} myImage={myImage} />}

        </IsDesktopContext.Provider>
    );
}