package info.atowers.practicelit.java;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

public class Main {
    public static void main(String[] args) throws IOException, TimeoutException, InterruptedException {
        Map<String, String> envProperties = System.getenv();
        String envString = envProperties.get("ENV");
        boolean isProduction =  envString == null || envString.equalsIgnoreCase("production");
        startTestRunner(isProduction);
    }
    public static void startTestRunner(boolean isProduction) throws IOException, TimeoutException, InterruptedException {
        try {
            TestRunner.startTestRunner(isProduction);
        } catch (java.net.ConnectException e) {
            System.out.println("rabbitmq server cannot be reached, trying again in 1s");
            TimeUnit.SECONDS.sleep(1);
            main(null);
        }
    }
}
