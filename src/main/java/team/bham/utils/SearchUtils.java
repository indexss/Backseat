package team.bham.utils;

import java.util.LinkedHashMap;
import java.util.Map;

public class SearchUtils {

    private CodeMessagePair pairA;
    private CodeMessagePair pairB;
    private Map<String, Object> data = new LinkedHashMap<>();

    public SearchUtils() {
        this.pairA = new CodeMessagePair("0", "success");
        this.pairB = new CodeMessagePair("0", "success");
    }

    public SearchUtils(String codeA, String messageA, String codeB, String messageB) {
        this.pairA = new CodeMessagePair(codeA, messageA);
        this.pairB = new CodeMessagePair(codeB, messageB);
    }

    public SearchUtils put(String key1, Object value1, String key2, Object value2) {
        this.data.put(key1, value1);
        this.data.put(key2, value2);
        return this;
    }

    // Getters for CodeMessagePair A and B
    public CodeMessagePair getPairA() {
        return pairA;
    }

    public CodeMessagePair getPairB() {
        return pairB;
    }

    // Setters for CodeMessagePair A and B
    public void setPairA(CodeMessagePair pairA) {
        this.pairA = pairA;
    }

    public void setPairB(CodeMessagePair pairB) {
        this.pairB = pairB;
    }

    // Getter for data map
    public Map<String, Object> getData() {
        return data;
    }

    // Setter for data map
    public void setData(Map<String, Object> data) {
        this.data = data;
    }
}
