# JavaTestRunner (JTR)
Tests Java submitted code for PracticeLit

# Usage (Production)
JTR is ran through docker-compose from the root directory of PracticeLit.

# Usage (Standalone/Development)
Download all gradle dependences using `gradle dependencies`

Make sure [RabbitMQ](http://www.rabbitmq.com/) is running.

Then run `./gradlew run`

JTR accepts the following environment variables:
 * ENV: sets whether the environment is production or development
 * RMQ: sets the hostname for the rabbitmq message broker (has defaults based on ENV)

# Build
Run `./gradlew jar`

# TODO
 * Format and implementation for incomplete classes (just methods)
 * Solution for solution code that depends on other code (dealing with classpath issues)

# Specifications

## Test Suite Specifications
The JTR (Java Test Runner) system has a few ways to test code, the name of which should be specified under `tests` in the test suite's `manifest.json`.

## JSON for Single Method Testing
The JSON test suite definiton can be used to test singular Java methods with the `"tests": "json/method"` value.

The JSON schema for the specfication document, `spec.json`, is as follows

    {
        "requiredMethods": [method],
        "testCases": [testCase]
    }

whereas the `method` scehma is

    {
        "name": String,
        "return": String,
        "paramters": [String]
    }

and the `testCase` scehma is

    {
        "name": String,
        "input": [String], // should line up with indexing of parameters
        "expectedOutput": String,
        "tags": [String] // used with tags in the manifest for statistics about what test cases are easy/hard for students
    }

## Reference Implementation for Single Method Testing
The JTR also enables testing via reference implementations, so test cases do not need to be created manually, through the `"tests": "java/reference"` value.

### Providing a Reference Implementation
Implement `ReferenceImplementation` in `[testSuiteID].java` by providing a reference implementation and a `MethodSignature`, from there the JTR will fuzz random test cases based on the provided regex, and validate them on the ReferenceImplementation code.

### Providing Test Case Specifications
Using a reference implementation is preferred as it allows for random test cases using regex. A `spec.json` must be provided which follows the schema below:

    {
        "testSpecs": [testSpec]
    }

whereas the `testSpec` schema is

    {
        "name": String,
        "input: [regex], // TODO: probably a subset of regex,
        "tags: [String] // for stats purposes
    }