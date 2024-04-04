import { Button } from "@mui/material";
import { invoke } from '@tauri-apps/api/tauri'

export default function OpenDialog() {
    const handleClick = () => {
        invoke('open_dialog').then(res => console.log(res)).catch(console.error);
    }

    return <Button variant="contained" onClick={handleClick}>Open Dialog</Button>;
}