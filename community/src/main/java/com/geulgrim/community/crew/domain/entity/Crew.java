package com.geulgrim.community.crew.domain.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.geulgrim.community.crew.domain.entity.enums.BoardStatus;
import com.geulgrim.community.global.entity.BaseEntity;
import com.geulgrim.community.global.user.domain.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.EAGER;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Getter
public class Crew extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long crewId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    private String projectName;
    private String content;
    private Integer pen;
    private Integer color;
    private Integer bg;
    private Integer pd;
    private Integer story;
    private Integer conti;

    @Enumerated(STRING)
    private BoardStatus status;

    @OneToMany(mappedBy = "crew", cascade = CascadeType.ALL, fetch = LAZY)
    @JsonManagedReference
    private List<CrewImage> imageList;

}
