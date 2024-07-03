package com.geulgrim.recruit.job.domain.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@NoArgsConstructor
public class FirstLocate {
    @Id
    @Column(name="first_locate_key")
    private Long firstLocateKey;

    @Column(name="first_locate_name")
    private String firstLocateName;

    @Builder
    private FirstLocate(Long firstLocateKey, String firstLocateName) {
        this.firstLocateKey = firstLocateKey;
        this.firstLocateName = firstLocateName;
    }

}