package com.example.demo.Repositories;

import com.example.demo.Entities.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Long>
{
    //Tránh lỗi null
    Optional<AccountEntity> findByEmail(String email);

    // Find accounts assigned to a specific field
    List<AccountEntity> findByFieldId(Long fieldId);
}
