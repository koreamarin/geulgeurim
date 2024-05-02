package com.geulgrim.community.board.domain.entity;

import com.geulgrim.community.board.domain.entity.enums.ImageType;
import com.geulgrim.community.global.file.entity.FileUrl;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class BoardImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardImageId;
    private Long boardId;

    @ManyToOne
    @JoinColumn(name = "file_url_id")
    private FileUrl fileUrl;

    @Enumerated(EnumType.STRING)
    private ImageType imageType;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;
}
