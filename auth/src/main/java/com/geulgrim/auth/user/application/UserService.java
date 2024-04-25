package com.geulgrim.auth.user.application;

import com.geulgrim.auth.user.application.dto.SignUpRequestDto;
import com.geulgrim.auth.user.domain.User;
import com.geulgrim.auth.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public Long login(){
        return null;
    }

    public Boolean signUp(SignUpRequestDto dto){
        User user = dto.toEntity();
        userRepository.save(user);
        return true;
    }
}
