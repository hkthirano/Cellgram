import styles from './Header.module.css';

import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useContext, useRef, useState } from 'react';
import { IsDesktopContext } from '../Main';
import { invoke } from '@tauri-apps/api/tauri';
import Link from 'next/link';

type Props = {
    onSetImageData: (imageData: any) => void;
}

export default function Header(props: Props) {
    const isDesktop = useContext(IsDesktopContext);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const inputRef = useRef<HTMLInputElement>(null!); // 追加

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const fileObject = e.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(fileObject);
        reader.onload = (e) => {
            const base64 = (e.currentTarget as any).result;

            const image = new Image();
            image.src = base64;
            image.onload = () => {
                props.onSetImageData([image.width, image.height, image]);
            }
        }

        handleClose()
    };

    const onOpenImageClick = () => {
        if (isDesktop) {
            invoke<number[]>('open_img').then(imageData => {
                props.onSetImageData(imageData);
            }).catch(console.error);

            handleClose()
        }
        else {
            inputRef.current.click();
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <span className={styles.title}>Cellgram</span>

                <IconButton aria-label="delete" size="large" aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}>
                    <MenuIcon />
                </IconButton>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <input hidden ref={inputRef} type="file" onChange={onFileInputChange} />
                    <MenuItem onClick={onOpenImageClick}>Open</MenuItem>
                </Menu>
            </div>

            <Link href="/test">
                <Button variant="contained">Test</Button>
            </Link>
        </div>
    );
}