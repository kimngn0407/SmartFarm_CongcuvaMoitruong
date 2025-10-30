package com.example.demo.Repositories;

import com.example.demo.Entities.FieldEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FieldRepository extends JpaRepository<FieldEntity, Long> {
}

