package com.express.inventory.common.aspects.audit.strategies;

import java.util.Map;

import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.express.inventory.api.audit.enums.Action;
import com.express.inventory.api.users.User;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class LoginAuditStrategy extends BaseAuditStrategy {
    public LoginAuditStrategy(ApplicationContext ctx, ObjectMapper objectMapper) {
        super(ctx, objectMapper);
    }

    @Override
    public Action getAction() {
        return Action.LOGIN;
    }

    @Override
    public Map<String, Object> resolveOldValue(Object[] args, Class<?> entity) throws Exception {
        return null;
    }

    @Override
    public Map<String, Object> resolveNewValue(Object result, Class<?> entity) throws Exception {
        User user = (User) result;
        return Map.of(
                "status", "SUCCESS",
                "userId", user.getId(),
                "username", user.getEmail(),
                "ip", getClientIp());
    }

    private String getClientIp() {
        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (attrs == null)
            return null;

        HttpServletRequest request = attrs.getRequest();

        String xfHeader = request.getHeader("X-Forwarded-For");

        if (xfHeader != null && !xfHeader.isEmpty()) {
            return xfHeader.split(",")[0];
        }

        return request.getRemoteAddr();
    }
}
