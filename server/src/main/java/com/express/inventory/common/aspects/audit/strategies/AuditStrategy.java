package com.express.inventory.common.aspects.audit.strategies;

import java.util.Map;

import org.aspectj.lang.ProceedingJoinPoint;

import com.express.inventory.api.audit.enums.Action;

public interface AuditStrategy {
    Action getAction();

    Map<String, Object> resolveOldValue(Object[] args, Class<?> entity) throws Exception;

    Map<String, Object> resolveNewValue(Object result, Class<?> entity) throws Exception;

    String resolveEntityId(ProceedingJoinPoint joinPoint, Object result);
}
