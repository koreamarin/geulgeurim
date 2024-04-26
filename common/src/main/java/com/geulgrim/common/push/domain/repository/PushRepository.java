package com.geulgrim.common.push.domain.repository;

import com.geulgrim.common.push.domain.Push;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PushRepository extends JpaRepository<Push, Long> {
}
