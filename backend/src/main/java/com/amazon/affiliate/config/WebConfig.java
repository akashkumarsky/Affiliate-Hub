package com.amazon.affiliate.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Apply to all API endpoints
            .allowedOrigins("https://affiliate-hub.netlify.app") // Allow your React app's origin
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Specify allowed methods
            .allowedHeaders("*") // Allow all headers
            .allowCredentials(true);
    }
}