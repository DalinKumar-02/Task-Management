package com.groupproject.services.auth;


import com.groupproject.dtos.SignupRequest;
import com.groupproject.dtos.UserDTO;
import com.groupproject.entities.User;
import com.groupproject.enums.UserRole;
import com.groupproject.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor

public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;

    @PostConstruct
    private void createAnAdminAccount(){

        Optional<User> optionalUser = userRepository.findByUserRole(UserRole.ADMIN);
        if (optionalUser.isEmpty()){
            User newAdmin = new User();
            newAdmin.setName("Admin");
            newAdmin.setEmail("admin@gmail.com");
            newAdmin.setPassword(new BCryptPasswordEncoder().encode("Admin"));
            newAdmin.setUserRole(UserRole.ADMIN);
            userRepository.save(newAdmin);
        }
        else{
            System.out.println("Admin Account Already Exists");
        }
    }

    @Override
    public UserDTO signup(SignupRequest signupRequest) {
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        user.setName(signupRequest.getName());
        user.setUserRole(UserRole.EMPLOYEE);
        user.setPassword(new BCryptPasswordEncoder().encode(signupRequest.getPassword()));
        return userRepository.save(user).getUserDTO();

    }

    @Override
    public Boolean hasUserWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }
}
