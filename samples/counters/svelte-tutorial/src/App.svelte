<script lang="ts">
    import Counter from './views/ui/Counter.svelte';
    import {root} from "./viewmodels/root.svelte";
</script>

{#each root.counters as counter}
    <Counter counter={counter}/>
{/each}

<button type="button" onclick={root.addCounter}>
    Add counter
</button>
