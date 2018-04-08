package info.atowers.practicelit.java.compiler;

import java.lang.reflect.Type;
import java.lang.reflect.Method;

public class MethodSignature {
    private String name;
    private Type[] parameterTypes; // order matters
    private Type outputType;

    public MethodSignature(String name, Type[] parameterTypes, Type outputType) {
        this.name = name;
        this.parameterTypes = parameterTypes;
        this.outputType = outputType;
    }

    /**
     * @param other the {@code Method} object to compare
     * @return true : if the method signature of the give method is equivalent to this object,
     *         false: otherwise
     */
    public boolean equalsMethod(Method other) {
        if (!other.getName().equals(name)) { // compare method name
            return false;
        }
        Type[] otherParameterTypes = other.getParameterTypes();
        if (otherParameterTypes.length != parameterTypes.length) { // compare total number of parameters
            return false;
        }
        for (int i = 0; i < parameterTypes.length; i++) { // compare parameter types
            if (!parameterTypes[i].getTypeName().equals(otherParameterTypes[i].getTypeName())) {
                return false;
            }
        }
        if (!outputType.getTypeName().equals(other.getReturnType().getTypeName())) { // compare output types
            return false;
        }

        return true;
    }

    /**
     * @param methods methods to check
     * @return true if the method signature exists in the array of methods
     */
    public boolean existsIn(Method[] methods) {
        for (Method m : methods) {
            if (this.equalsMethod(m)) return true;
        }
        return false;
    }

    /**
     * @return the name of the function
     */
    public String getName() {
        return name;
    }

}
