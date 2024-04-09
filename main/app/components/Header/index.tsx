import Link from 'next/link';
import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';

import styles from './Header.module.css';

type Props = {
  onOpenImageClick: () => void;
}

export default function Header(props: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onOpenImageClick = () => {
    props.onOpenImageClick();
    handleClose();
  }

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
          <MenuItem onClick={onOpenImageClick}>Open</MenuItem>
        </Menu>
      </div>

      <Link href="/sample">
        <Button variant="contained">Sample</Button>
      </Link>
    </div>
  );
}
