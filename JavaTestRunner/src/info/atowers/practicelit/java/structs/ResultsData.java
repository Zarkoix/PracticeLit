package info.atowers.practicelit.java.structs;

import info.atowers.practicelit.java.testinfo.TestInfo;
import org.json.simple.JSONObject;

/**
 * Basic struct for storing the exact information as the TS type CodeSubmission on the node server
 * All fields are public but final (because the submission object is designed to be consumed and garbage collected)
 */
public class ResultsData {
    /**
     * Creates ResultsData Object into JSON of the following shape
     * {
     *     "submissionID": String,
     *     "questionID": String, // TODO: change this to a number so casting can be removed in Node
     *     "resultsData": @see testinfo.TestInfo's toJSON for TestInfo format,
     * }
     * @return the TestCase object as JSON
     * @see JSONObject
     */
    public static JSONObject toJSON(String submissionID, String questionID, TestInfo resultsData) {
        JSONObject test = new JSONObject();
        test.put("submissionID", submissionID);
        test.put("questionID", questionID);
        test.put("resultsData", resultsData.toJSON());
        return test;
    } 
}