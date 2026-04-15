package com.express.inventory.common.aspects.audit.strategies;

import java.util.List;
import java.util.Map;

import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import com.express.inventory.api.audit.enums.Action;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class BulkCreateAuditStrategy extends BaseAuditStrategy {
    public BulkCreateAuditStrategy(ApplicationContext applicationContext, ObjectMapper objectMapper) {
        super(applicationContext, objectMapper);
    }

    public Action getAction() {
        return Action.BULK_CREATE;
    }

    @Override
    public Map<String, Object> resolveOldValue(Object[] args, Class<?> enttiy) {
        return null;
    }

    @Override
    public Map<String, Object> resolveNewValue(Object result, Class<?> entity) {
        if (result instanceof List<?> list) {
            return Map.of("count", list.size());
        }
        return Map.of("count", 1);
    }

    @Override
    public String resolveEntityId(ProceedingJoinPoint joinPoint, Object result) {
        return null;
    }
}
