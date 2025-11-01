package com.example.demo.Repositories;

import com.example.demo.Entities.FarmEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FarmRepository extends JpaRepository<FarmEntity, Long> {
}
