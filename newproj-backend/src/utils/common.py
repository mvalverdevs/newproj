import inspect


def whoami():
    # Return the current function name.
    return inspect.stack()[1][3]

