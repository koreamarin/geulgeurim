package com.geulgrim.community.board.domain.entity;

import com.geulgrim.community.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Board extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardId;
    private long userId;
    private String title;
    private String content;
    private long hit;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<BoardComment> commentList;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    private List<BoardImage> imageList;
}
