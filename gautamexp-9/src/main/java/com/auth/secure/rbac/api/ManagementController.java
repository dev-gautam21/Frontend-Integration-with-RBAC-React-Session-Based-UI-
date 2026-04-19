package com.auth.secure.rbac.api;

import com.auth.secure.rbac.dto.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class ManagementController {

    @GetMapping("/dashboard")
    public ApiResponse accessAdminDashboard() {
        return new ApiResponse("success", "Admin access granted");
    }
}
