package com.geulgrim.community.crew.domain.repository;

import com.geulgrim.community.crew.application.dto.response.CrewListResponse;
import com.geulgrim.community.crew.domain.entity.Crew;
import com.geulgrim.community.share.application.dto.response.ShareListResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CrewRepository extends JpaRepository<Crew, Long>, CrewCustomRepository {
    @Query("SELECT new com.geulgrim.community.crew.application.dto.response.CrewListResponse(" +
            "c.crewId, c.user.userId, c.user.nickname, c.user.fileUrl, c.projectName, " +
            "c.pen, c.color, c.bg, c.pd, c.story, c.conti, c.status, c.createdAt, c.updatedAt) " +
            "FROM Crew c " +
            "LEFT JOIN c.user u " +
            "GROUP BY c.crewId " +
            "ORDER BY c.createdAt DESC LIMIT 6")
    List<CrewListResponse> findCrewMainList();

    @Query("SELECT new com.geulgrim.community.crew.application.dto.response.CrewListResponse(" +
            "c.crewId, c.user.userId, c.user.nickname, c.user.fileUrl, c.projectName, " +
            "c.pen, c.color, c.bg, c.pd, c.story, c.conti, c.status, c.createdAt, c.updatedAt) " +
            "FROM Crew c " +
            "LEFT JOIN c.user u " +
            "GROUP BY c.crewId " +
            "ORDER BY c.createdAt DESC")
    List<CrewListResponse> findCrewResponseList();
}
