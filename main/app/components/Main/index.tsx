import { ChangeEvent, useContext, useRef } from 'react';

import Header from '../Header';
import { IsDesktopContext } from '../MainWrapper';
import styles from './Main.module.css';

export default function Main() {
    const isDesktop = useContext(IsDesktopContext);

    const inputRef = useRef<HTMLInputElement>(null!);
    const canvasRef = useRef<HTMLCanvasElement>(null!);

    const readImage = () => {
        if (isDesktop) {

        }
        else {
            inputRef.current.click();
        }
    }

    const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const fileObject = e.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(fileObject);
        reader.onload = (e) => {
            if (e.target === null) return;
            const base64 = e.target.result as string;

            const image = new Image();
            image.src = base64;
            image.onload = () => {
                onImageDataSet(image.width, image.height, image);
            }
        }
    }

    const onImageDataSet = (width: number, height: number, imageEl: HTMLImageElement) => {
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d')!;
        context.drawImage(imageEl, 0, 0);
    }

    return (
        <div>
            <Header onOpenImageClick={readImage} />

            {/* 非表示 */}
            <input hidden ref={inputRef} type="file" onChange={onFileInputChange} />

            <canvas className={styles.canvas} ref={canvasRef} />
        </div>
    );
}