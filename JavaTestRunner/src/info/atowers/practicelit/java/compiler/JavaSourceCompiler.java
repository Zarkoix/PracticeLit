package info.atowers.practicelit.java.compiler;

/*
 This class was heavily modified from a class written by Amr Draz found on
 https://stackoverflow.com/questions/26309795/how-can-i-clear-a-dynamically-compiled-class-from-memory
*/

import javax.tools.*;
import javax.tools.JavaCompiler.CompilationTask;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.ResourceBundle;
import javax.tools.JavaFileObject;
import java.io.IOException;

/**
 * wrapper for compiling java source into memory that exposes methods for garbage collecting the methods after they
 * have been used
 */
public class JavaSourceCompiler {

    private boolean didError;
    private boolean hasCompiled;
    private Class classObject;
    private DiagnosticCollector<JavaFileObject> diagnostics;
    private SimpleJavaFileObject fileObject;
    private ClassFileManager fileManager;

    public JavaSourceCompiler() {
        hasCompiled = false;
        didError = false;

        diagnostics = null;
        classObject = null;
        fileObject = null;
        fileManager = null;
    }

    /**
     * compiles the given code
     *
     * @param name      Class Name
     * @param code      String to compile
      */
    public void compile(String name, String code) {
        hasCompiled = true; // set the hasCompiled flag to true to allow execution

        /* Creating dynamic java source code file object */
        fileObject = new DynamicJavaSourceCodeObject(name, code);
        JavaFileObject[] javaFileObjects = new JavaFileObject[]{fileObject};

        /* Instantiating the java compiler */
        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();

        /*
         * Retrieving the standard file manager from compiler object, which is used to provide
         * basic building block for customizing how a compiler reads and writes to files.
         *
         * The same file manager can be reopened for another compiler task.
         * Thus we reduce the overhead of scanning through file system and jar files each time
          */
        StandardJavaFileManager stdFileManager = compiler.getStandardFileManager(null, null, null);
        // uses custom file manager with defined class loader inorder to unload the compiled class when this is done
        fileManager = new ClassFileManager(stdFileManager);

        /* Prepare a list of compilation units (java source code file objects) to input to compilation task */
        Iterable<? extends JavaFileObject> compilationUnits = Arrays.asList(javaFileObjects);

        /* Prepare any compilation options to be used during compilation */
        // In this example, we are asking the compiler to place the output files under bin folder.
        List<String> compileOptions = new ArrayList<>();
        // compileOptions.addAll(Arrays.asList("-classpath", System.getProperty("java.class.path")));
        // Iterable<String> compilationOptions = Arrays.asList(compileOptions);

        /* Create a diagnostic controller, which holds the compilation problems */
        diagnostics = new DiagnosticCollector<>();

        /* Create a compilation task from compiler by passing in the required input objects prepared above */
        CompilationTask compilerTask = compiler.getTask(null, fileManager, diagnostics, compileOptions, null,
                compilationUnits);

        // Perform the compilation by calling the call method on compilerTask object.
        didError = compilerTask.call();

        if (diagnostics.getDiagnostics().isEmpty()) {
            try {
                ClassLoader x = fileManager.getClassLoader(null);
                classObject = x.loadClass(name);
            } catch (ClassNotFoundException e) {
                System.err.println("Class not found: " + e);
            }
        }
    }

    /**
     * TODO: figure out why it always returns true (from the task not this function) even when class is fine
     * and no diagnostics are present
     *
     * @return true : if the compiler threw an error,
     *         false: otherwise
     * @throws IllegalStateException if compile() has not been called
     */
    public boolean didError() throws IllegalStateException {
        if (!hasCompiled) {
            throw new IllegalStateException("must run compile() first");
        }
        return didError;
    }

    /**
     * @return the Class the source code has been compiled into
     * @throws IllegalStateException if compile() has not been called
     */
    public Class getCompiledClass() throws IllegalStateException {
        if (!hasCompiled) {
            throw new IllegalStateException("must run compile() first");
        }
        return classObject;
    }

    /**
     * @return the diagnostic collector with information about compilation errors
     * @throws IllegalStateException if compile() has not been called
     */
    public DiagnosticCollector<JavaFileObject> getDiagnosticCollector() throws IllegalStateException {
        if (!hasCompiled) {
            throw new IllegalStateException("must run compile() first");
        }
        return diagnostics;
    }

    /**
     * unloads the class and files from memory
      */
    public boolean unloadClass() throws IllegalStateException {
        if (!hasCompiled) {
            throw new IllegalStateException("must run compile() first");
        }

        try {
            fileObject.delete();
            fileManager.unloadClass(null);
            fileManager.close();
            ResourceBundle.clearCache(ClassLoader.getSystemClassLoader()); // <--useless
            return true;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }
}

