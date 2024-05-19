package com.geulgrim.community.share.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.geulgrim.community.board.domain.entity.Board;
import com.geulgrim.community.global.entity.BaseEntity;
import com.geulgrim.community.global.user.domain.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShareComment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shareCommentId;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user;
    private String content;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "share_id")
    private Share share;
}
