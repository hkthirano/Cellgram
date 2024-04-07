import { useContext, useEffect, useRef } from "react";
import { IsDesktopContext } from "../Main";

type Props = {
    base64: string;
    myImage: any;
}

export default function Content(props: Props) {
    const isDesktop = useContext(IsDesktopContext);

    const canvasRef = useRef<HTMLCanvasElement>(null!);

    useEffect(() => {
        if (isDesktop) {
            const canvas = canvasRef.current;
            canvas.width = props.myImage[0];
            canvas.height = props.myImage[1];
            const context = canvas.getContext('2d')!;
            const img = context.createImageData(canvas.width, canvas.height);
            for (let i = 0; i < img.data.length; i++) {
                img.data[i] = props.myImage[2][i];
            }
            context.putImageData(img, 0, 0);
        }
    }, [])

    return (
        <div>
            <h1>Content</h1>
            {isDesktop ? 'Desktop' : 'Web'}

            {isDesktop ? <canvas ref={canvasRef} /> : <img src={props.base64} />}
        </div>
    );
}