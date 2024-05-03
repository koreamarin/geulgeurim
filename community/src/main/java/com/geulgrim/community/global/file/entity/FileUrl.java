package com.geulgrim.community.global.file.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class FileUrl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileUrlId;
    private String fileUrl;

}
