package com.express.inventory.services;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;

@Service
public class PingService {

    @Scheduled(fixedRate = 840000)
    public void keepAlive() {
        try {
            URI uri = new URI("https://express-inventory-system.onrender.com/actuator/health");

            URL url = uri.toURL();

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(5000);

            int responseCode = connection.getResponseCode();
            System.out.println("Self-ping Status: " + responseCode);

            connection.disconnect();
        } catch (Exception e) {
            System.err.println("Self-ping failed: " + e.getMessage());
        }
    }
}