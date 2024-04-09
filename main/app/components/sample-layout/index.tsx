import Link from 'next/link';

import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import styles from './sample-layout.module.css';

export default function SampleLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <div className={styles.container}>
                <Link href="/">
                    <span className={styles.title}>Cellgram</span>
                </Link>
            </div>
            <div className={styles['side-nav-and-conetent-container']}>
                <div className={styles['side-nav-container']}>
                    <List>
                        <ListItem>
                            <ListItemButton>
                                <ListItemText primary="Menu 1"></ListItemText>
                            </ListItemButton>
                        </ListItem>

                        <ListItem>
                            <ListItemButton>
                                <ListItemText primary="Menu 2"></ListItemText>
                            </ListItemButton>
                        </ListItem>

                        <ListItem>
                            <ListItemButton>
                                <ListItemText primary="Menu 3"></ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </div>

                {children}
            </div>
        </div>
    )
}