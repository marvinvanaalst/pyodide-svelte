import { base } from '$app/paths';
import { loadPyodide, version } from "pyodide";

let pyodideReady = false;
let pyFuncs: any;

const indexURL = `https://cdn.jsdelivr.net/pyodide/v${version}/full/`;

async function setupPyodide() {
  try {
    const pyodide = await loadPyodide({ indexURL, packages: ['numpy'] });

    const response = await fetch(`${base}/main.py`);
    const pythonScript = await response.text();
    pyFuncs = pyodide.runPython(pythonScript);
    console.log('Python Ready');
    pyodideReady = true;
  } catch(e) {
    console.error('Python loading failed.');
    console.error(e);
  }
}

const pyodidePromise = setupPyodide();

self.onmessage = async function(e){
  await pyodidePromise;
  if (!pyodideReady) {
    postMessage("pyodide_not_available");
    return;
  }

  // const result = pyFuncs.getParetoPoints(...e.data.map(JSON.stringify));
  // postMessage(JSON.parse(result));
  const result = pyFuncs.my_fn(e.data.num);
  postMessage(result)

}
