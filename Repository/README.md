# Repository

This folder stores example questions and implementation details for a PracticeLit repository.

# Repository Format
**repository.json** contains the directory structure of the repository in the format:

    {
        "142": {
            "Winter 2017": {
                "Static Methods": {
                     "add1": "Add 1"
                }
            }
        }
    }

Keys with values of Strings are questions, the value is the id.
Keys with values of objects are directories, the value is the children.

The repository contains folders with the name of the ID of the contained question, the question format present in these folders is defined below.

# Question Format
Location and meta-data: **manifest.json**

    {
        "name": "Add 1",
        "id": "win2017add1",
        "language": "java",
        "tests": "json",
        "location": "142/Winter 2017/Static Methods",
        "author": "Adam Towers",
        "dateCreated": "1356739200",
        "tags": ["Static Methods"]
    }


Testing file (Language Specific):
    * Filename: **[id].java**
    * For java this is a Java class that implements ITestSuite, see the documentation of that class in `JavaTestRunner` for details.