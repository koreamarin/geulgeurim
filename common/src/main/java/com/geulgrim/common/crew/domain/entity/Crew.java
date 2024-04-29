package com.geulgrim.common.crew.domain.entity;

import com.geulgrim.common.crew.domain.entity.enums.BoardStatus;
import com.geulgrim.common.global.domain.entity.BaseEntity;
import com.geulgrim.common.user.domain.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    private BoardStatus status;


}
