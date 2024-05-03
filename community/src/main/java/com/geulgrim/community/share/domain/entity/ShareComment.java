package com.geulgrim.community.share.domain.entity;

import com.geulgrim.community.board.domain.entity.Board;
import com.geulgrim.community.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShareComment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shareCommentId;
    private Long userId;
    private String content;

    @ManyToOne
    @JoinColumn(name = "share_id")
    private Share share;
}
