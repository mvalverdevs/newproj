import json


def field_replace(params, keys, replacement):
    """
    Replaces the concrete values in the dictionary of action parameters (Action.http_post_parameters) with the
    indicated value. Makes a recursive search through the dictionary looking for key names that match the
    list of keys passed as argument.
    :param params: parameters of the registered action
    :param keys: str|list  key or keys to search
    :param replacement: string that will be put in place of the original in each field that is found
    :return: list of actions with changed values
    """

    def replace_item(obj, key, replace_value):
        for k, v in obj.items():
            if isinstance(v, dict):
                obj[k] = replace_item(v, key, replace_value)
        if key in obj:
            obj[key] = replace_value
        return obj

    # Hide the keys field whenever it appears.
    if isinstance(params, str):
        try:
            params = json.loads(params)
        except Exception:
            return params
    if isinstance(keys, str):
        params = replace_item(params, keys, replacement)
    else:
        for key in keys:
            params = replace_item(params, key, replacement)
    return json.dumps(params)
