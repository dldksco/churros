package com.a503.churros.user.domain.entity.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="user")
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_idx")
    private Long id;

    @JsonIgnore
    @Column(name="user_password")
    private String password;
    @Email
    @Column(nullable = false ,name = "user_email")
    private String email;

    @Column(nullable = false, name="user_name")
    private String name;

    @Column(name="user_provider")
    private Integer provider;

    @Column(name="user_roles")
    private Integer roles;

    @Column(name="user_image_url")
    private String imageUrl;



    @Builder
    public User(Long id,String password, String email, String name, Integer provider, Integer roles, String imageUrl) {
        this.id = id;
        this.password = password;
        this.email = email;
        this.name = name;
        this.provider = provider;
        this.roles = roles;
        this.imageUrl = imageUrl;
    }


}
