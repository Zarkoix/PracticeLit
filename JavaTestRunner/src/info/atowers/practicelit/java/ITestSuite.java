package info.atowers.practicelit.java;

import info.atowers.practicelit.java.compiler.MethodSignature;
import info.atowers.practicelit.java.testinfo.TestCase;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Optional;

public interface ITestSuite {
    /**
     * Runs the tests on the given class (is responsible for instantiating it), can be assumed that class has the
     * necessary methods defined in {@code requiredMethods}
     * @param testCode the class to test
     * @return a {@code List<TestCase>} of the test cases
     * @throws NoSuchMethodException if the method does not exist, however the test runner aims to ensure any methods
     *                               defined in {@code requiredMethods()} are defined in the test code
     * @throws IllegalAccessException TODO explain this
     * @throws InvocationTargetException TODO explain this
     */
    List<TestCase> runTests(Class testCode) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException;

    /**
     * @return an array of {@code MethodSignature} to ensure the code has the necessary methods before tests are ran
     */
    MethodSignature[] requiredMethods();

    /**
     *
     * @return an {@code Optional<String>}, contains a {@code String} of the class nme if the given code is a full
     * class, otherwise is {@code Optional.empty}
     */
    Optional<String> isFullClass();

    /**
     * @return name of the test suite
     */
    String getName();
}
