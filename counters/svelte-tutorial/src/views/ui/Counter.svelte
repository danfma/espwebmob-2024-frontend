<script lang="ts">
    import {type Counter} from '../../viewmodels/counter.svelte.js'

    let { counter }: { counter: Counter } = $props();
</script>

<div class="counter">
    <button type="button" onclick={counter.decrement}> -</button>
    <span>{counter.count}</span>
    <button type="button" onclick={counter.increment}> +</button>
</div>

<style lang="scss">
  :global {
    .counter {
      display: flex;
      gap: 0.5rem;
    }

    .counter + .counter {
      margin-top: 0.5rem;
    }
  }

  button {
    padding: 0.125rem 1rem;
  }
</style>
