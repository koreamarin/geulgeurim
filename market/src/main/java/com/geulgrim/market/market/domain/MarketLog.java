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
public class MarketLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    @JoinColumn(name = "piece_id")
    private Long piece;

    private Long buyerId;

    private Double price;

}
