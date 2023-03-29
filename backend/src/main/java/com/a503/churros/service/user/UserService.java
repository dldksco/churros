package com.a503.churros.service.user;

import com.a503.churros.config.security.CurrentUser;
import com.a503.churros.config.security.UserPrincipal;
import com.a503.churros.dto.user.response.MyPageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


public interface UserService {

    MyPageResponse myPage(Long userIdx);
}
