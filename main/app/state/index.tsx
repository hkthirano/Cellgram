import { createContext, ReactNode } from 'react';

type Props = {
    children: ReactNode,
    isDesktop: boolean,
}

export const IsDesktopContext = createContext(false);

export function Provider({ children, isDesktop }: Props) {
    return (
        <IsDesktopContext.Provider value={isDesktop}>
            {children}
        </IsDesktopContext.Provider>);
}