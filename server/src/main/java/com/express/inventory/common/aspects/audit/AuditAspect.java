package com.express.inventory.common.aspects.audit;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Service;

import com.express.inventory.api.audit.AuditLog;
import com.express.inventory.api.audit.AuditLogRepository;
import com.express.inventory.api.audit.enums.Action;
import com.express.inventory.common.aspects.audit.strategies.AuditStrategy;

@Aspect
@Service
public class AuditAspect {

    private final AuditLogRepository auditLogRepository;
    private final Map<Action, AuditStrategy> strategies;

    public AuditAspect(AuditLogRepository auditLogRepository, List<AuditStrategy> strategyList) {
        this.auditLogRepository = auditLogRepository;
        this.strategies = strategyList.stream()
                .collect(Collectors.toMap(AuditStrategy::getAction, s -> s));
    }

    @Around("@annotation(audit)")
    public Object logAround(ProceedingJoinPoint joinPoint, Audit audit) throws Throwable {
        AuditStrategy auditStrategy = strategies.get(audit.action());

        Map<String, Object> oldValue = auditStrategy.resolveOldValue(joinPoint.getArgs(), audit.entity());

        Object result = joinPoint.proceed();

        Map<String, Object> newValue = auditStrategy.resolveNewValue(result, audit.entity());

        AuditLog auditLog = AuditLog.builder()
                .action(audit.action())
                .entity(audit.entity().getSimpleName())
                .entityId(auditStrategy.resolveEntityId(joinPoint, result))
                .oldValue(oldValue)
                .newValue(newValue)
                .build();

        auditLogRepository.save(auditLog);

        return result;
    }
}
