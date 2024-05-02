package com.geulgrim.market.piece.domain;

import com.geulgrim.market.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Market extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long thumbnail_id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Piece piece_id;

    private String title;

    private String content;

    private String price;

}
