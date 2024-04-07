import styles from './Header.module.css';

import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useRef, useState } from 'react';

type Props = {
    onSetBase64: (base64: string) => void;
}

export default function Header(props: Props) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const inputRef = useRef<HTMLInputElement>(null!); // 追加

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onProfileButtonClick = () => {
        inputRef.current.click();
    };

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const fileObject = e.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(fileObject);
        reader.onload = (e) => {
            const base64 = (e.currentTarget as any).result;
            props.onSetBase64(base64);
        }

        handleClose()
    };

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
                    <MenuItem onClick={onProfileButtonClick}>Open</MenuItem>
                </Menu>
            </div>

            <Button variant="contained">Test</Button>
        </div>
    );
}