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

    private Long piece;

    private Long seller;

    private String title;

    private String content;

    private Double price;

    public void uploadThumbnail(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

}
