package info.atowers.practicelit.java.testinfo;

import java.util.ArrayList;
import java.util.List;
import org.json.simple.*;

/**
 * Stores information about a set of test cases, such that they can be
 * serialized into JSON
 */
public class TestInfo {
    private int testCasesPassed;
    private int testCasesFailed;
    private List<TestCase> testCases;
    private List<TestError> testErrors;

    public TestInfo(List<TestCase> testCases) {
        this.testCases = testCases;
        testCases.forEach(this::updateStats);
    }

    public TestInfo() {
        testCases = new ArrayList<>();
        testErrors = new ArrayList<>();
    }

    /**
     * Adds a new test to this set of cases
     * @param newTest newTest to add
     */
    public void addTest(TestCase newTest) {
        updateStats(newTest);
        testCases.add(newTest);
    }

    /**
     * Adds each test in a list of tests to this set of cases
     * @param newTests list of tests to add
     */
    public void addTests(List<TestCase> newTests) {
        for (TestCase t : newTests) {
            addTest(t);
        }
    }

    /**
     * Adds a {@code TestError} to this testinfo
     */
    public void addError(TestError newError) {
        testErrors.add(newError);
    }

    /**
     * Updates testCasesPassed or testCasesFailed based on whether test was
     * passed
     * @param newTest newTest to update stats with
     */
    private void updateStats(TestCase newTest) {
        if (newTest.isPassed()) {
            testCasesPassed++;
        } else {
            testCasesFailed++;
        }
    }

    /**
     * Converts testinfo Object into JSON of the following shape
     * {
     *     "testCasesPassed": Number,
     *     "testCasesFailed": Number,
     *     "testCaseInfo": [
     *          each TestCase -> TestCase.toJSON()
     *     ]
     * }
     * @return the testinfo object as JSON
     * @see JSONObject
     */
    public JSONObject toJSON() {
        JSONObject obj = new JSONObject();
        obj.put("testCasesPassed", testCasesPassed);
        obj.put("testCasesFailed", testCasesFailed);
        JSONArray testCaseInfo = new JSONArray();
        testCases.stream().map(TestCase::toJSON).forEach(testCaseInfo::add);
        obj.put("testCaseInfo", testCaseInfo);
        if (!testErrors.isEmpty()) { // if there are errors add them to the JSONObject
            JSONArray testErrorInfo = new JSONArray();
            testErrors.stream().map(TestError::toJSON).forEach(testErrorInfo::add);
            obj.put("testErrorInfo", testErrorInfo);
        }
        return obj;
    }

    public String toString() {
        return toJSON().toString();
    }
}
