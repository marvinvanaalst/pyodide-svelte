<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  // declarations
  let worker: Worker | null = null;
  // result will be filled in by worker.onmessage
  let result = $state(0.0);


  onMount(() => {
    // worker only in browser
    if (!browser) return;

    worker =new Worker(
      new URL("$lib/workers/pyworker.ts", import.meta.url),
      {
        type: "module",
      },
    );
    worker.onmessage = (e: MessageEvent) => {
      result = e.data; // here result is filled in
    };
    worker.onerror = (e) => {
      console.log(e);
    };

    return () => worker?.terminate();
});

  function doSomething() {
    worker?.postMessage({num: result})
  }


</script>

<h1>Sveltekit + Pyodide</h1>
<p>Uses Pyodide to call NumPy via Python to increment a js counter by (x+1)^2</p>

<button onclick={doSomething}>Press: </button><span>{result}</span>

<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the svelte documentation</p>
<p>Visit <a href="https://pyodide.org/en/stable/">pyodide.org/en/stable</a> to read the pyodide documentation</p>

<style>
    button {
        margin: 0 0.5rem;
    }
</style>
