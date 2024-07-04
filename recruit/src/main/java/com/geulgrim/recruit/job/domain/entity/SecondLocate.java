package com.geulgrim.recruit.job.domain.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@NoArgsConstructor
public class SecondLocate {
    @Id
    @Column(name="second_locate_key")
    private Long secondLocateKey;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "first_locate_key", referencedColumnName = "first_locate_key", nullable = false)
    private FirstLocate firstLocate;

    @Column(name="second_locate_name", nullable = false, length = 63)
    private String secondLocateName;

    @Builder
    private SecondLocate(Long secondLocateKey, FirstLocate firstLocate, String secondLocateName) {
        this.secondLocateKey = secondLocateKey;
        this.firstLocate = firstLocate;
        this.secondLocateName = secondLocateName;
    }
}
