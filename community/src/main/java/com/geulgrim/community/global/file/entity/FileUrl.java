package com.geulgrim.community.global.file.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class FileUrl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fileUrlId;
    private String fileUrl;

}
