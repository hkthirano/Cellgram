import Button from '@mui/material/Button';
import { useContext } from 'react';
import { invoke } from '@tauri-apps/api/tauri'
// import { IsDesktopContext } from './page';

export default function LsButton() {
    // const isDesktop = useContext(IsDesktopContext);

    const handleClick = () => {
        // if (!isDesktop) return;

        invoke<string>('ls')
            .then(result => console.log(result))
            .catch(console.error)
    }

    return <Button variant="contained" onClick={handleClick}>Hello world</Button>;
}