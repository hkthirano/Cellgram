import { useContext } from "react";
import { IsDesktopContext } from "../Main";

type Props = {
    base64: string;
}

export default function Content(props: Props) {
    const isDesktop = useContext(IsDesktopContext);

    return (
        <div>
            <h1>Content</h1>
            {isDesktop ? 'Desktop' : 'Web'}

            <img src={props.base64} />
        </div>
    );
}