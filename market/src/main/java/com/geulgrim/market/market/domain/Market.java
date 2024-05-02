package com.geulgrim.market.market.domain;

import com.geulgrim.market.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Market extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String thumbnailUrl;

    private Long piece; //이후 common쪽에 Piece 생성 후 서버 통신으로 가져오게 변경 필요

    private Long seller;

    private String title;

    private String content;

    private Double price;

    public void uploadThumbnail(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

}
