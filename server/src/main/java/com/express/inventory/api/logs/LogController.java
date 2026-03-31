package com.express.inventory.api.logs;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.express.inventory.api.logs.dto.response.LogResponseDTO;
import com.express.inventory.common.dto.ApiResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/logs")
public class LogController {
    private final LogService logService;

    @GetMapping()
    public ResponseEntity<ApiResponse<List<LogResponseDTO>>> getAllLogs() {
        List<LogResponseDTO> logs = logService.getAll();
        return ApiResponse.success(HttpStatus.OK, "Logs retrieved successfully", logs);
    }
}
