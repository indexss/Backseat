package team.bham.utils;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @project : team31
 * @package: team.bham.utils
 * @class: ResponseUtils
 * @date: (UTC + 0 London) 03/03/2024 15:05
 * @author: indexss (cnshilinli@gmail.com)
 * @description: A wrapper of the JSON info
 */

public class ResponseUtils {

    private String code;
    private String message;
    private Map data = new LinkedHashMap<>();

    public ResponseUtils() {
        this.code = "0";
        this.message = "success";
    }

    public ResponseUtils(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public ResponseUtils put(String key, Object value) {
        this.data.put(key, value);
        return this;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map getData() {
        return data;
    }

    public void setData(Map data) {
        this.data = data;
    }
}
