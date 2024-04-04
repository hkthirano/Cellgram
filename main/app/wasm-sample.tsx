import React, { useEffect, useState } from 'react';
import init, { add } from './wasm/hello_wasm';

export default function WasmSample() {
    const [value, setValue] = useState<number>(0);

    useEffect(() => {
        init().then(() => {
            setValue(add(2, 3));
        })
    }, [])

    return (
        <div>
            2 + 3 = {value}
        </div>
    );
}