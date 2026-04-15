package com.express.inventory.common.aspects.audit.strategies;

import java.beans.Introspector;
import java.util.Map;

import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.context.ApplicationContext;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public abstract class BaseAuditStrategy implements AuditStrategy {

    protected final ApplicationContext applicationContext;
    protected final ObjectMapper objectMapper;

    @SuppressWarnings("unchecked")
    protected JpaRepository<?, Integer> getRepositoryFor(Class<?> entity) {
        String entityName = entity.getSimpleName();
        String repoName = Introspector.decapitalize(entityName) + "Repository";
        return (JpaRepository<?, Integer>) applicationContext.getBean(repoName);
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> resolveOldValue(Object[] args, Class<?> entity) throws Exception {
        Integer id = (Integer) args[0];
        Object existing = getRepositoryFor(entity).findById(id).orElse(null);
        return objectMapper.convertValue(existing, Map.class);
    }

    @SuppressWarnings("unchecked")
    public Map<String, Object> resolveNewValue(Object result, Class<?> entity) throws Exception {
        return objectMapper.convertValue(result, Map.class);
    }

    public String resolveEntityId(ProceedingJoinPoint joinPoint, Object result) {
        try {
            Object id = result.getClass().getMethod("id").invoke(result);
            return id != null ? id.toString() : null;
        } catch (Exception e) {
            return null;
        }
    }
}
