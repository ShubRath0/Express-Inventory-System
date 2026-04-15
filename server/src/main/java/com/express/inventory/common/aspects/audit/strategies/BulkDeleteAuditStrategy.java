package com.express.inventory.common.aspects.audit.strategies;

import java.util.Map;

import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import com.express.inventory.api.audit.enums.Action;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class BulkDeleteAuditStrategy extends BaseAuditStrategy {

    private final ThreadLocal<Long> countBefore = new ThreadLocal<>();

    public BulkDeleteAuditStrategy(ApplicationContext applicationContext, ObjectMapper objectMapper) {
        super(applicationContext, objectMapper);
    }

    public Action getAction() {
        return Action.BULK_DELETE;
    }

    @Override
    public Map<String, Object> resolveOldValue(Object[] args, Class<?> entity) {
        long count = getRepositoryFor(entity).count();
        countBefore.set(count);
        return Map.of("count", count);
    }

    @Override
    public Map<String, Object> resolveNewValue(Object result, Class<?> entity) {
        long before = countBefore.get();
        long after = getRepositoryFor(entity).count();

        countBefore.remove();

        return Map.of(
                "countBefore", before,
                "countAfter", after,
                "deleted", before - after);
    }

    @Override
    public String resolveEntityId(ProceedingJoinPoint joinPoint, Object result) {
        return null;
    }
}
