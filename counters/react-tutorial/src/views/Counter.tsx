import {useCallback, useEffect, useLayoutEffect, useState} from 'react'
import Button from "./ui/Button.tsx";

function Counter() {
    const [count, setCount] = useState(0)

    const decrement = useCallback(
        () => {
            setCount(count => count - 1)
        },
        []
    )

    const increment = useCallback(
        () => {
            setCount(count => count + 1)
        },
        []
    )

    return (
        <div>
            <Button onClick={decrement}> -</Button>
            <span>{count}</span>
            <Button onClick={increment}> +</Button>
        </div>
    )
}

export default Counter
