"use client"

import { createContext } from 'react';
import Greet from "./greet";
import ImageViewer from "./image-viewer";
import LsButton from "./ls-button";
import OpenDialog from "./open_dialog";
import WasmSample from "./wasm-sample";

const isDesktop = typeof window !== 'undefined' && window.__TAURI__ !== undefined;
export const IsDesktopContext = createContext(isDesktop);

export default function Home() {
  return (
    <IsDesktopContext.Provider value={isDesktop}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Greet />

        <ImageViewer />

        <LsButton />

        <WasmSample />

        <OpenDialog />
      </main>
    </IsDesktopContext.Provider>
  );
}
