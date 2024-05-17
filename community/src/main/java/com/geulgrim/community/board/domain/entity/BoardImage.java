package com.geulgrim.community.board.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.geulgrim.community.board.domain.entity.enums.ImageType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class BoardImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardImageId;

    private String fileUrl;

    @Enumerated(EnumType.STRING)
    private ImageType imageType;

    @ManyToOne
    @JoinColumn(name = "board_id")
    @JsonBackReference
    private Board board;
}
