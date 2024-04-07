import { useContext, useEffect, useRef } from "react";
import { IsDesktopContext } from "../Main";

type Props = {
    imageData: any;
}

export default function Content(props: Props) {
    const isDesktop = useContext(IsDesktopContext);

    const canvasRef = useRef<HTMLCanvasElement>(null!);

    useEffect(() => {
        if (isDesktop) {
            const canvas = canvasRef.current;
            canvas.width = props.imageData[0];
            canvas.height = props.imageData[1];
            const context = canvas.getContext('2d')!;
            const img = context.createImageData(canvas.width, canvas.height);
            for (let i = 0; i < img.data.length; i++) {
                img.data[i] = props.imageData[2][i];
            }
            context.putImageData(img, 0, 0);
        }
    }, [])

    return (
        <div>
            <h1>Content</h1>
            {isDesktop ? 'Desktop' : 'Web'}

            {props.imageData ? <canvas ref={canvasRef} /> : <img src={props.imageData} />}
        </div>
    );
}