package com.geulgrim.common.global.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

import static jakarta.persistence.GenerationType.IDENTITY;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Getter
public class FileUrl {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column
    private Long fileUrlId;

    @Column
    private String fileUrl;
}
