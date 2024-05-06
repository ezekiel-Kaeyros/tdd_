import math
import sys

def example1():
    """
    Generate the function comment for the given function body in a markdown code block with the correct language syntax.

    Returns:
        tuple: The some_tuple tuple and the some_variable dictionary.
    """
    # Define a tuple with four elements
    some_tuple = (1, 2, 3, "a")

    # Define a dictionary with three key-value pairs
    some_variable = {
        # Long code lines should be wrapped within 66 characters
        "long": "Long code lines should be wrapped within 66 characters.",
        # The value is a list with six elements
        "other": [
            math.pi,  # First element is the value of pi
            100,  # Second element is the number 100
            200,  # Third element is the number 200
            300,  # Fourth element is the number 300
            9876543210,  # Fifth element is a large number
            "This is a long string that goes on",  # Sixth element is a long string
        ],
        # The value is a nested dictionary and a list
        "more": {
            # This whole logical line should be wrapped
            "inner": "This whole logical line should be wrapped.",
            # The key is the some_tuple tuple and the value is a list with six elements
            some_tuple: [1, 20, 300, 40000, 500000000, 60000000000000000],
        },
    }

    # Return the some_tuple tuple and the some_variable dictionary
    return some_tuple, some_variable


def example2():
    """
    A function that returns the result of a chained method call using the `has_key()` function.

    Returns:
        dict: The result of the chained method call using the `has_key()` function.
    """
    return {"has_key() is deprecated": True}.has_key({"f": 2}.has_key(""))


class Example3(object):
    def __init__(self, bar):
        """
        Initializes the instance with the given `bar`.

        Parameters:
            bar (any): The value to be assigned to `bar`.

        Returns:
            tuple: A tuple containing the `sys.path` list and the `some_string` value.
        """
        # Comments should have a space after the hash.
        if bar:
            bar += 1
            bar = bar * bar
            return bar
        else:
            some_string = """
                       Indentation in multiline strings should not be touched.
Only actual code should be reindented.
"""
            return (sys.path, some_string)
