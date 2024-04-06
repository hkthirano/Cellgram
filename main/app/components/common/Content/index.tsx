import { useContext } from "react";
import { IsDesktopContext } from "../Main";

export default function Content() {
    const isDesktop = useContext(IsDesktopContext);

    return (
        <div>
            <h1>Content</h1>
            {isDesktop ? 'Desktop' : 'Web'}
        </div>
    );
}