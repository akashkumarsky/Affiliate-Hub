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

	@Bean
	CommandLineRunner commandLineRunner(CategoryRepository categoryRepository) {
		return args -> {
			// Create some category objects
			Category electronics = new Category();
			electronics.setName("Electronics");

			Category clothing = new Category();
			clothing.setName("Clothing");

			Category books = new Category();
			books.setName("Books");

			Category beauty = new Category();
			beauty.setName("Beauty");

			// Save them to the database
			categoryRepository.save(electronics);
			categoryRepository.save(clothing);
			categoryRepository.save(books);
			categoryRepository.save(beauty);

			System.out.println("---- DATABASE SEEDED WITH 4 CATEGORIES ----");
		};
	}
}
