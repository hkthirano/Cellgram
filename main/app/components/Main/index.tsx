import { ChangeEvent, useContext, useRef } from 'react';

import { IsDesktopContext } from '@/app/state';
import { invoke } from '@tauri-apps/api/tauri';

import Header from '../Header';
import styles from './Main.module.css';

export default function Main() {
    const isDesktop = useContext(IsDesktopContext);

    const inputRef = useRef<HTMLInputElement>(null!);
    const canvasRef = useRef<HTMLCanvasElement>(null!);

    const readImage = () => {
        if (isDesktop) {
            invoke<any>('open_img').then(imageData => {
                setImageDataForDesktop(imageData[0], imageData[1], imageData[2]);
            }).catch(console.error);
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
                setImageDataForWeb(image.width, image.height, image);
            }
        }
    }

    const setImageDataForDesktop = (width: number, height: number, imageData: number[]) => {
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height
        const context = canvas.getContext('2d')!;
        const img = context.createImageData(canvas.width, canvas.height);
        for (let i = 0; i < img.data.length; i++) {
            img.data[i] = imageData[i];
        }
        context.putImageData(img, 0, 0);
    }

    const setImageDataForWeb = (width: number, height: number, imageEl: HTMLImageElement) => {
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