import Greet from "./greet";
import ImageViewer from "./image-viewer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Greet />

      <ImageViewer />
    </main>
  );
}
