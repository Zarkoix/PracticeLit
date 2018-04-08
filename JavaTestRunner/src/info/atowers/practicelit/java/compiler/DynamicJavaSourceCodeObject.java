package info.atowers.practicelit.java.compiler;

/*
    This class was written by Amr Draz and copied from
    https://stackoverflow.com/questions/26309795/how-can-i-clear-a-dynamically-compiled-class-from-memory
 */

import javax.tools.SimpleJavaFileObject;
import java.net.URI;
import java.io.IOException;

class DynamicJavaSourceCodeObject extends SimpleJavaFileObject{
    private String sourceCode ;

    /**
     * Converts the name to an URI, as that is the format expected by JavaFileObject
     *
     * @param name given to the class file
     * @param source the source code string
     */
    protected DynamicJavaSourceCodeObject(String name, String source) {
        super(URI.create("string:///" +name.replaceAll("\\.", "/") + Kind.SOURCE.extension), Kind.SOURCE);
        this.sourceCode = source ;
    }

    @Override
    public CharSequence getCharContent(boolean ignoreEncodingErrors)
            throws IOException {
        return sourceCode ;
    }

    public String getSourceCode() {
        return sourceCode;
    }
}