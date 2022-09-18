import * as React from "react";

export const RoundTable = (): JSX.Element => {
    React.useEffect(() => {
        let script = document.createElement('script');
        script.src = "/js/index.js";
        document.body.appendChild(script);
        let script2 = document.createElement('script');
        script2.src = "/js/plugin1.js";
        document.body.appendChild(script2);
        return () => {
            document.body.removeChild(script);
            document.body.removeChild(script2);
        }
    }, [])
    return (
        <div id={"canvasContainer"} style={{ width: "300px" }}>
        </div>
    );
}