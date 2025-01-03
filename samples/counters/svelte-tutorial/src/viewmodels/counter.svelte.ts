
export function createCounter() {
    let count = $state(0);

    const decrement = () => {
        count--;
    }

    const increment = () => {
        count++;
    }

    return {
        get count() {
            return count;
        },
        decrement,
        increment
    }
}

export type Counter = ReturnType<typeof createCounter>;
