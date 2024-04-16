package team.bham.utils;

/**
 * @project : team31
 * @package: team.bham.utils
 * @class: ResponseUtils
 * @date: (UTC + 0 London) 03/03/2024 15:05
 * @author: indexss (cnshilinli@gmail.com)
 * @description: A wrapper of the JSON info
 */

public class CodeMessagePair {

    private String code;
    private String message;

    public CodeMessagePair(String code, String message) {
        this.code = code;
        this.message = message;
    }

    // Getters
    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    // Setters
    public void setCode(String code) {
        this.code = code;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
