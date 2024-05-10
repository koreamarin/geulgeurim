package com.geulgrim.recruit.job.domain.entity;

import jakarta.persistence.*;

@Entity
public class First_locate {
    @Id
    @Column(name="first_locate_key")
    private Long firstLocateKey;
    @Column(name="first_locate_name")
    private String firstLocateName;

}
