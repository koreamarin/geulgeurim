package com.geulgrim.common.pushmail.domain.respository;

import com.geulgrim.common.pushmail.domain.PushMail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PushMailRepository extends JpaRepository<PushMail, Long> {
}
