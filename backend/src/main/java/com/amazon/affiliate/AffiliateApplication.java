package com.amazon.affiliate;

import com.amazon.affiliate.entity.Category;
import com.amazon.affiliate.repository.CategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AffiliateApplication {

	public static void main(String[] args) {
		SpringApplication.run(AffiliateApplication.class, args);
	}

	
	
}
