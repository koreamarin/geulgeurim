package com.geulgrim.community.board.domain.entity;

import com.geulgrim.community.board.domain.entity.enums.ImageType;
import jakarta.persistence.*;

@Entity
public class BoardImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardImageId;
    private Long boardId;
    private Long imageUrlId;
    @Enumerated(EnumType.STRING)
    private ImageType imageType;

}
