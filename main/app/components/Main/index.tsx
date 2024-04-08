import { useContext } from "react";
import { IsDesktopContext } from "../MainWrapper";

export default function Main() {
    const isDesktop = useContext(IsDesktopContext);

    return (
        <div>
            <h1>Home</h1>
            {isDesktop ? <p>Desktop</p> : <p>Web</p>}
        </div>
    );
}