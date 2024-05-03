package com.geulgrim.community.share.domain.entity;

import com.geulgrim.community.global.entity.BaseEntity;
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
public class Share extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long shareId;
    private long userId;
    private String title;
    private String content;
    private long hit;

    @OneToMany(mappedBy = "share", cascade = CascadeType.ALL)
    private List<ShareComment> commentList;

    @OneToMany(mappedBy = "share", cascade = CascadeType.ALL)
    private List<ShareImage> imageList;
}
