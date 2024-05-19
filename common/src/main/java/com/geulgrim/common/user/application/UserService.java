package com.geulgrim.common.user.application;

import com.geulgrim.common.user.Exception.NoUserExistException;
import com.geulgrim.common.user.application.dto.request.FcmUpdateRequestDto;
import com.geulgrim.common.user.domain.entity.User;
import com.geulgrim.common.user.domain.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void updateUserFcm(FcmUpdateRequestDto dto) {

        User user = userRepository.findById(dto.getId()).orElseThrow(NoUserExistException::new);
        user.updateFcmToken(dto.getFcmToken());
    }

}
