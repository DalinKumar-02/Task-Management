package com.groupproject.dtos;


import com.groupproject.enums.UserRole;
import lombok.Data;

@Data
public class UserDTO {

    private long id;

    private String name;

    private String email;

    private String password;

    private UserRole userRole;

}
