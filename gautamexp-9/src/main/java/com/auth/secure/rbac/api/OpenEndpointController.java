package com.auth.secure.rbac.api;

import com.auth.secure.rbac.dto.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/public")
public class OpenEndpointController {
    
    @GetMapping("/hello")
    public ApiResponse publicHello() {
        return new ApiResponse("success", "This is a public endpoint");
    }
}
