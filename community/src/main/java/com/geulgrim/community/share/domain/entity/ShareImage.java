package com.geulgrim.community.share.domain.entity;

import com.geulgrim.community.share.domain.entity.enums.ImageType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
public class ShareImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long shareImageId;

    private String fileUrl;

    @Enumerated(EnumType.STRING)
    private ImageType imageType;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "share_id")
    private Share share;
}
