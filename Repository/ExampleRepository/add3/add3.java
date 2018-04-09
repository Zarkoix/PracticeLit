package info.atowers.practicelit.java.testsuites;

import info.atowers.practicelit.java.testinfo.TestCase;
import info.atowers.practicelit.java.ITestSuite;
import info.atowers.practicelit.java.compiler.MethodSignature;

import java.lang.reflect.*;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

public class add3 implements ITestSuite {

    @Override
    public Optional<String> isFullClass() {
        return Optional.of("HelloWorld");
    }

    @Override
    public List<TestCase> runTests(Class testCode)
            throws NoSuchMethodException, IllegalAccessException, InvocationTargetException
    {
        Method add1 = testCode.getMethod("add3", int.class);

        System.out.println("TestCase suite 1 executing");
        List<TestCase> tests = new LinkedList<>();
        TestCase tc1 = new TestCase("Test Case 1", "2", "5");
        tc1.answer("" + add1.invoke(null, 2));

        tests.add(tc1);
        return tests;
    }

    @Override
    public MethodSignature[] requiredMethods() {
        return new MethodSignature[]{
                new MethodSignature("add3", new Type[]{Integer.TYPE}, Integer.TYPE)};
    }

    @Override
    public String getName () {
        return "add3";
    }
}
