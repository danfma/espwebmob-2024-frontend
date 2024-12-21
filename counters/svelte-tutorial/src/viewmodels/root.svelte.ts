import {type Counter, createCounter} from "./counter.svelte";

export function createRoot() {
    const counters: Counter[] = $state([ createCounter() ]);

    const addCounter = () => {
        counters.push(createCounter());
    }

    return {
        counters,
        addCounter
    }
}

export const root = $state(createRoot());
