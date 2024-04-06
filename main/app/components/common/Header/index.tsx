import styles from './Header.module.css';

import { Button, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
    return (
        <div className={styles.container}>
            <span className={styles.title}>Cellgram</span>

            <div>
                <IconButton aria-label="delete" size="large">
                    <MenuIcon />
                </IconButton>

                <Button variant="contained">Test</Button>
            </div>
        </div>
    );
}