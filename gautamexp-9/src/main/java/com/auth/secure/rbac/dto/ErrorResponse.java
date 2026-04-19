package com.auth.secure.rbac.dto;

public class ErrorResponse {
    private String status;
    private int code;
    private String message;

    public ErrorResponse(String status, int code, String message) {
        this.status = status;
        this.code = code;
        this.message = message;
    }

    public String getStatus() { return status; }
    public int getCode() { return code; }
    public String getMessage() { return message; }
}
