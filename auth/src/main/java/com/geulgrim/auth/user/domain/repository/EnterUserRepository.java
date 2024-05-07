package com.geulgrim.auth.user.domain.repository;

import com.geulgrim.auth.user.application.dto.request.EnterUserLoginRequest;
import com.geulgrim.auth.user.domain.entity.EnterUser;
import com.geulgrim.auth.user.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnterUserRepository extends JpaRepository<EnterUser, Long> {

    Optional<EnterUser> findByPassword(String password);

    Optional<EnterUser> findByUser(User user);

    boolean existsByCompanyNum(String company_num);
}
