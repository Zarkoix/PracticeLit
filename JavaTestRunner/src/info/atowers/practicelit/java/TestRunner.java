package info.atowers.practicelit.java;
import com.rabbitmq.client.*;
import info.atowers.practicelit.java.compiler.JavaSourceCompiler;
import info.atowers.practicelit.java.compiler.MethodSignature;
import info.atowers.practicelit.java.testinfo.TestError;
import info.atowers.practicelit.java.testinfo.TestInfo;

import javax.tools.Diagnostic;
import javax.tools.DiagnosticCollector;
import javax.tools.JavaFileObject;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.Locale;
import java.util.Optional;
import java.lang.reflect.Method;

public class TestRunner {

    private final static String SUBMIT_QUEUE_NAME = "q_submit";
    private final static String TESTS_QUEUE_NAME = "q_tests";

    public static void startTestRunner(boolean isProduction)  throws java.io.IOException, java.util.concurrent
            .TimeoutException,
            java.lang.InterruptedException {
        ConnectionFactory factory = new ConnectionFactory();
        System.out.println("starting test runner in " + (isProduction ? "production" : "development"));
        if (isProduction) {
            factory.setHost("rabbitmq");
        } else {
            factory.setHost("localhost");
        }
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        channel.queueDeclare(SUBMIT_QUEUE_NAME, false, false, false, null);
        channel.queueDeclare(TESTS_QUEUE_NAME, false, false, false, null);

        System.out.println("[!] Ready to receive tasks");

        Consumer consumer = new DefaultConsumer(channel) {
            int taskNumber = 0;

            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties,
                                       byte[] body) throws IOException {
                String message = new String(body, "UTF-8");
                int delimiterIndex = message.indexOf(" ");
                int delimiter2Index = message.indexOf(" ", delimiterIndex + 1);

                String sessionID = message.substring(0, delimiterIndex);
                String questionID = message.substring(delimiterIndex + 1, delimiter2Index);
                String code = message.substring(delimiter2Index);

                TestInfo testInfo = new TestInfo();
                ITestSuite testSuite = fetchTestSuite(testInfo, questionID);
                testCode(testInfo, testSuite, code);


                String response = sessionID + " " + questionID + " " + testInfo.toJSON();
                System.out.println(response);
                channel.basicPublish("", TESTS_QUEUE_NAME, null, response.getBytes());
                taskNumber++;
            }
        };

        boolean autoAck = true; // automatically acknowledge work completion
        channel.basicConsume(SUBMIT_QUEUE_NAME, autoAck, consumer);
    }

    /**
     * Runs the test suite on provided code and updates the testInfo accordingly
     * @param testInfo the {@code TestInfo} object to add test case info to
     * @param suite the {@code ITestSuite} to run
     * @param code the code to compile and test
     */
    public static void testCode(TestInfo testInfo, ITestSuite suite, String code) {
        Optional<String> isFullClass = suite.isFullClass();
        String className = isFullClass.orElse("TestCode");
        JavaSourceCompiler compiler = new JavaSourceCompiler();
        if (isFullClass.isPresent()) { // if isFullClass is present, than compile as such
            compiler.compile(className, code);
        } else {
            // diagnostics = CodeCompiler.compileIncompleteClass(className, code);
        }
        DiagnosticCollector<JavaFileObject> diagnostics = compiler.getDiagnosticCollector();

        if (diagnostics.getDiagnostics().isEmpty()) { // no diagnostics means code compiled successfully
            MethodSignature[] requiredMethods = suite.requiredMethods();

            Class testCode = compiler.getCompiledClass();

            Method[] methods = testCode.getMethods();
            boolean allNecessaryMethodsFound = true;
            for (MethodSignature s : requiredMethods) {
                if (!s.existsIn(methods)) {
                    testInfo.addError(new TestError("Necessary method not found could not find method "+
                            s.getName() + " with correct parameters and return type"));
                    allNecessaryMethodsFound = false;
                }
            }

            if (allNecessaryMethodsFound) {
                // run the testsuite on the class and add the resulting tests to testInfo
                try {
                    testInfo.addTests(suite.runTests(testCode));
                } catch (NoSuchMethodException e) {
                    System.out.println("required method check failed and test suite [" + suite.getName() + "] threw a" +
                            " NoSuchMethodException");
                    e.printStackTrace();
                } catch (IllegalAccessException|InvocationTargetException e) {
                    e.printStackTrace();
                }
                // unload the class to prevent memory leaks
                compiler.unloadClass();
            }

        } else {
            // TODO return a JSON diagnostics to the user
            for (Diagnostic diagnostic : compiler.getDiagnosticCollector().getDiagnostics())
                testInfo.addError(new TestError(diagnostic.getMessage(new Locale("en")) +
                        " on  line " + "number " + diagnostic.getLineNumber()));
        }
    }

    /**
     * @param testInfo testInfo object to add test suite fetching errors to
     * @param questionID the questionID used to locate the correct testInfo object
     * @return the test suite
     */
    public static ITestSuite fetchTestSuite(TestInfo testInfo, String questionID) {
        ITestSuite suite = null;
        try {
            suite = Class.forName("info.atowers.practicelit.java.testsuites." + questionID)
                    .asSubclass(ITestSuite.class).newInstance();
        } catch (InstantiationException e) {
            testInfo.addError(new TestError("Server Error 001: An error occurred while preparing the test suite."));
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            testInfo.addError(new TestError("Server Error 002: An error occurred while preparing the test suite."));
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            testInfo.addError(new TestError("Server Error 003: An error occurred while preparing the test suite."));
            e.printStackTrace();
        }
        return suite;
    }
}
