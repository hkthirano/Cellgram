import { createContext, useEffect, useState } from "react";
import Header from "../Header";
import Content from "../Content";

export const IsDesktopContext = createContext(false);

export default function Main() {
    const [isDesktop, setIsDesktop] = useState(false);
    const [imageData, setImageData] = useState<any>(null);

    useEffect(() => {
        const _isDesktop = typeof window !== 'undefined' && window.__TAURI__ !== undefined;
        setIsDesktop(_isDesktop)
    }, [])

    const onSetImageData = (imageData: any) => {
        setImageData(imageData)
    }

    return (
        <IsDesktopContext.Provider value={isDesktop}>
            <Header onSetImageData={onSetImageData} />

            {imageData && <Content imageData={imageData} />}

        </IsDesktopContext.Provider>
    );
}