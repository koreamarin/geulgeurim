package com.geulgrim.community.share.domain.entity;

import com.geulgrim.community.share.domain.entity.enums.ImageType;
import com.geulgrim.community.global.file.entity.FileUrl;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ShareImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardImageId;

    @ManyToOne
    @JoinColumn(name = "file_url_id")
    private FileUrl fileUrl;

    @Enumerated(EnumType.STRING)
    private ImageType imageType;

    @ManyToOne
    @JoinColumn(name = "share_id")
    private Share share;
}
