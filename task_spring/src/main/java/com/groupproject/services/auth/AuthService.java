package com.groupproject.services.auth;

import com.groupproject.dtos.SignupRequest;
import com.groupproject.dtos.UserDTO;

public interface AuthService {

    UserDTO signup(SignupRequest signupRequest);

    Boolean hasUserWithEmail(String email);
}
