package com.express.inventory.common.aspects.audit.strategies;

import java.util.Map;

import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import com.express.inventory.api.audit.enums.Action;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class DeleteAuditStrategy extends BaseAuditStrategy {
    public DeleteAuditStrategy(ApplicationContext ctx, ObjectMapper objectMapper) {
        super(ctx, objectMapper);
    }

    public Action getAction() {
        return Action.DELETE;
    }

    @Override
    public Map<String, Object> resolveNewValue(Object result, Class<?> entity) {
        return null;
    }

    @Override
    public String resolveEntityId(ProceedingJoinPoint joinPoint, Object result) {
        for (Object arg : joinPoint.getArgs()) {
            if (arg instanceof Long || arg instanceof Integer || arg instanceof String) {
                return String.valueOf(arg);
            }
        }
        return null;
    }
}
