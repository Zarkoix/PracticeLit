package info.atowers.practicelit.java.testinfo;

import org.json.simple.JSONObject;

/**
 * Stores information about a single test cass, such that it can be
 * serialized into JSON
 */
public class TestCase {
    private String name;
    private boolean isPassed;
    private boolean attempted;
    private String givenInput;
    private String expectedOutput;
    private String givenOutput;

    public TestCase(String name, boolean isPassed, String givenInput, String expectedOutput, String givenOutput) {
        this.attempted = true;
        this.name = name;
        this.isPassed = isPassed;
        this.givenInput = givenInput;
        this.expectedOutput = expectedOutput;
        this.givenOutput = givenOutput;
    }

    public TestCase(String name, String givenInput, String expectedOutput) {
        this.attempted = false;
        this.name = name;
        this.givenInput = givenInput;
        this.expectedOutput = expectedOutput;
    }

    /**
     * Checks answer and updates whether the test was passed or not
     *
     * Function provided to enable a create test object now, answer it later
     * usage pattern
     *
     * @param givenOutput the output provided by the code
     */
    public void answer(String givenOutput) {
        attempted = true;
        this.givenOutput = givenOutput;
        isPassed = givenOutput.equals(expectedOutput);
    }

    /**
     * @return whether the test case was passed
     */
    public boolean isPassed() {
        return isPassed;
    }


    /**
     * @return string of format:
     *              if test has not been attempted:
     *                  name: 1 -> 2
     *              if test has been attempted and passed:
     *                  name (passed): 1 -> 2
     *              if test has been attempted and failed:
     *                  name (failed): 1 -> 2 => 3
     *
     * TODO: refactor this code into if-else for readability
     */
    public String toString() {
        return name + (attempted ? " (" + (isPassed ? "passed" : "failed") + "): " : ": ") + givenInput + " -> " +
                expectedOutput + (attempted && !isPassed ? " => " + givenOutput : "");
    }

    /**
     * Converts TestCase Object into JSON of the following shape
     * {
     *     "name": String,
     *     "isPassed": Bool,
     *     "givenInput": String,
     *     "expectedOutput": String,
     *     "givenOutput": String
     * }
     * @return the TestCase object as JSON
     * @see JSONObject
     */
    public JSONObject toJSON() {
        JSONObject test = new JSONObject();
        test.put("name", name);
        test.put("isPassed", isPassed);
        test.put("givenInput", givenInput);
        test.put("expectedOutput", expectedOutput);
        test.put("givenOutput", givenOutput);
        return test;
    }
}
