package com.geulgrim.community.board.domain.repository;

import com.geulgrim.community.board.domain.entity.BoardImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardImageRepository extends JpaRepository<BoardImage, Long> {
    List<BoardImage> findAllByBoardBoardId(long boardId);
}
