package com.geulgrim.recruit.job.domain.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class FirstLocate {
    @Id
    @Column(name="first_locate_key")
    private Long firstLocateKey;
    @Column(name="first_locate_name")
    private String firstLocateName;

}
