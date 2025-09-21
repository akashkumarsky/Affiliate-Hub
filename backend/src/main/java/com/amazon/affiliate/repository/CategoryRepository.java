package com.amazon.affiliate.repository;

import com.amazon.affiliate.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // JpaRepository gives us findAll(), findById(), save(), delete(), etc. for free!
    Optional<Category> findByName(String name);
}