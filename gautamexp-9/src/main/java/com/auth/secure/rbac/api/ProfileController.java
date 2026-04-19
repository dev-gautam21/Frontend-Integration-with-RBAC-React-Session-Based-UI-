package com.auth.secure.rbac.api;

import com.auth.secure.rbac.dto.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class ProfileController {

    @GetMapping("/profile")
    public ApiResponse getMyProfile() {
        return new ApiResponse("success", "Welcome, authenticated user");
    }
}
