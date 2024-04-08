import { useContext } from "react";
import { IsDesktopContext } from "../MainWrapper";
import Header from "../Header";

export default function Main() {
    const isDesktop = useContext(IsDesktopContext);

    return (
        <div>
            <Header />

            <h1>Home</h1>
            {isDesktop ? <p>Desktop</p> : <p>Web</p>}
        </div>
    );
}