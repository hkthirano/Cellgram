import { useContext, useEffect, useRef } from 'react';

import { IsDesktopContext } from '@/app/state';

import styles from './Content.module.css';

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
        else {
            const canvas = canvasRef.current;
            canvas.width = props.imageData[0];
            canvas.height = props.imageData[1];
            const context = canvas.getContext('2d')!;
            context.drawImage(props.imageData[2], 0, 0);
        }
    }, [props.imageData])

    return (
        <div>
            <canvas className={styles.canvas} ref={canvasRef} />
        </div>
    );
}