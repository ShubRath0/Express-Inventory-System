package com.express.inventory.api.logs;

import java.util.List;

import org.springframework.stereotype.Service;

import com.express.inventory.api.logs.dto.response.LogResponseDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogService {
    private final InventoryLogRepository logRepository;

    public List<LogResponseDTO> getAll() {
        return logRepository.findAll().stream()
                .map(LogResponseDTO::fromEntity)
                .toList();
    }
}
