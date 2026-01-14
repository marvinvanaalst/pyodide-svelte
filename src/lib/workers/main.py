import numpy as np


def my_fn(x: float) -> float:
    return float(np.square(x + 1))


class FuncContainer:
    pass


py_funcs = FuncContainer()
py_funcs.my_fn = my_fn  # type: ignore

# pyodide returns last statement as an object that is assessable from javascript
py_funcs  # type: ignore
