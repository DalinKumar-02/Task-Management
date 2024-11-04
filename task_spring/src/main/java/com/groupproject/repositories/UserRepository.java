package com.groupproject.repositories;

import com.groupproject.entities.User;
import com.groupproject.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserRole(UserRole userRole);

    Optional<User> findFirstByEmail(String email);


}


