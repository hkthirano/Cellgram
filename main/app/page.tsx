import Greet from "./greet";
import ImageViewer from "./image-viewer";
import LsButton from "./ls-button";
import OpenDialog from "./open_dialog";
import WasmSample from "./wasm-sample";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Greet />

      <ImageViewer />

      <LsButton />

      <WasmSample />

      <OpenDialog />
    </main>
  );
}
