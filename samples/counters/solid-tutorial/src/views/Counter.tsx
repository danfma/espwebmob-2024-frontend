import {createSignal} from "solid-js";
import Button from "./ui/Button.tsx";

export function Counter() {
    const [count, setCount] = createSignal(0)

    const decrement = () => {
        setCount(count() - 1)
    }

    const increment = () => {
        setCount(count() + 1)
    }

    console.log('Counter::render')

    return (
        <div>
            <Button onClick={decrement}> -</Button>
            <span>{count()}</span>
            <Button onClick={increment}> +</Button>
        </div>
    )
}

export default Counter
