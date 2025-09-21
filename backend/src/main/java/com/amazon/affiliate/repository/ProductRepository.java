package com.amazon.affiliate.repository;

import com.amazon.affiliate.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Spring Data JPA is smart enough to create a query from the method name!
    // This will find all products belonging to a specific category.
    List<Product> findByCategoryName(String categoryName);
}