package com.geulgrim.community.share.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Share {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long shareId;
    private long userId;
    private String title;
    private String content;
    private long hit;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "share", cascade = CascadeType.ALL)
    private List<ShareComment> commentList;

    @OneToMany(mappedBy = "share", cascade = CascadeType.ALL)
    private List<ShareImage> imageList;
}
