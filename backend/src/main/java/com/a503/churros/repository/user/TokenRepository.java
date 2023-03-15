package com.a503.churros.repository.user;

import com.a503.churros.entity.user.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token,Long> {
    Optional<Token> findByUserEmail(String userEmail);

    Optional<Token> findByRefreshToken(String refreshToken);

}
