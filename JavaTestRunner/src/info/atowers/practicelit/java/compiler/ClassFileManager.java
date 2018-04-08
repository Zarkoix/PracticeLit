package info.atowers.practicelit.java.compiler;

/*
    This class is heavily based on a similar concept by Amr Draz posted on
    https://stackoverflow.com/questions/26309795/how-can-i-clear-a-dynamically-compiled-class-from-memory
 */

import javax.tools.*;
import javax.tools.JavaFileObject.Kind;
import javax.tools.StandardJavaFileManager;
import java.security.SecureClassLoader;
import java.io.*;

class ClassFileManager extends ForwardingJavaFileManager<StandardJavaFileManager> {
    /**
     * Instance of JavaClassObject that will store the
     * compiled bytecode of our class
     */
    private JavaClassObject jclassObject;
    /**
     * Instance of ClassLoader
     */
    public SecureClassLoader classLoader;

    /**
     * Will initialize the manager with the specified
     * standard java file manager
     *
     * @param standardManager
     */
    public ClassFileManager(StandardJavaFileManager standardManager) {
        super(standardManager);
        this.classLoader = new SecureClassLoader() {
            @Override
            protected Class<?> findClass(String name)
                    throws ClassNotFoundException {
                byte[] b = jclassObject.getBytes();
                return super.defineClass(name, jclassObject
                        .getBytes(), 0, b.length);
            }
        };
    }

    /**
     * Will be used by us to get the class loader for our
     * compiled class. It creates an anonymous class
     * extending the SecureClassLoader which uses the
     * byte code created by the compiler and stored in
     * the JavaClassObject, and returns the Class for it
     */
    @Override
    public ClassLoader getClassLoader(Location location) {
        return this.classLoader;
    }

    public void unloadClass(Location location) {
        this.classLoader = null;
        this.jclassObject = null;
        System.gc();
    }

    /**
     * Gives the compiler an instance of the JavaClassObject
     * so that the compiler can write the byte code into it.
     */
    @Override
    public JavaFileObject getJavaFileForOutput(Location location, String className, Kind kind, FileObject sibling)
            throws IOException {
        jclassObject = new JavaClassObject(className, kind);
        return jclassObject;
    }
}