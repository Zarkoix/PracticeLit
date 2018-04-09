package info.atowers.practicelit.java;

import info.atowers.practicelit.java.testinfo.TestInfo;

public class TestTestRunner {
    public static void main(String[] args) {
        TestInfo testInfo = new TestInfo();
        String questionID = "add1";
        String code =
                "public class HelloWorld {\n" +
                    "\tpublic static int add1(int a) { return a + 1; }\n" +
                "}";
        ITestSuite testSuite = TestRunner.fetchTestSuite(testInfo, questionID);
        TestRunner.testCode(testInfo, testSuite, code);
        System.out.println(testInfo.toJSON());
    }

}
