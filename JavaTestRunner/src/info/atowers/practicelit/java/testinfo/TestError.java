package info.atowers.practicelit.java.testinfo;

import org.json.simple.JSONObject;

/**
 * Stores information about a single test cass, such that it can be
 * serialized into JSON
 */
public class TestError {
    private int lineNumber;
    private String reason;

    public TestError(int lineNumber, String reason) {
        this.lineNumber = lineNumber;
        this.reason = reason;
    }

    public TestError(String reason) {
        this.lineNumber = -1;
        this.reason = reason;
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
        JSONObject testError = new JSONObject();
        if (lineNumber != -1) {
            testError.put("lineNumber", lineNumber);
        }
        testError.put("reason", reason);
        return testError;
    }
}
