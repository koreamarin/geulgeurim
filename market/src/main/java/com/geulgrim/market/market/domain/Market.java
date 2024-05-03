package com.geulgrim.market.market.domain;

import com.geulgrim.market.market.application.dto.request.MarketUpdateRequestDto;
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
public class Market {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String thumbnailUrl;

    private Long piece;

    private Long seller;

    private String title;

    private String content;

    private Double price;

    private int viewCount;

    public void uploadThumbnail(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }

    public void updateMarket(MarketUpdateRequestDto dto) {
        this.piece = dto.getPiece();
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.price = dto.getPrice();
    }

}
