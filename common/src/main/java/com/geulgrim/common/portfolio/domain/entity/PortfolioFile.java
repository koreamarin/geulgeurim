package com.geulgrim.common.portfolio.domain.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Getter
public class  PortfolioFile {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column
    private Long pofolFileId;


    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "pofol_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Portfolio portfolio;

    private String fileUrl;

}
