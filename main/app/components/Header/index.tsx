import Link from 'next/link';
import { useRef, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';

import styles from './Header.module.css';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const inputRef = useRef<HTMLInputElement>(null!);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onOpenImageClick = () => { }

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { }

  return (
    <div className={styles.container}>
      <div>
        <span className={styles.title}>Cellgram</span>

        <IconButton
          aria-label="delete"
          size="large"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
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
