package info.atowers.practicelit.java.structs;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
/**
 * Basic struct for storing the exact information as the TS type CodeSubmission on the node server
 * All fields are public
 */
public class CodeSubmission {
    public String submissionID;
    public String questionID;
    public String code;

    public CodeSubmission(String submissionID, String questionID, String code) {
        this.submissionID = submissionID;
        this.questionID = questionID;
        this.code = code;
    }

    public CodeSubmission(String json) {
        JSONParser parser = new JSONParser();
        try {
            JSONObject obj = (JSONObject) parser.parse(json);
            System.out.println("code received");
            System.out.println(obj.toString());
            submissionID = "" + obj.get("submissionID");
            System.out.println(submissionID);
            questionID = "" + obj.get("questionID");
            code = "" +  obj.get("code");
        } catch (ParseException e) {
            System.out.println(e);
        }
    }
}