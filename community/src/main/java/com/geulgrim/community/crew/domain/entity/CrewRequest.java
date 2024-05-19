package com.geulgrim.community.crew.domain.entity;


import com.geulgrim.community.crew.domain.entity.enums.CrewStatus;
import com.geulgrim.community.crew.domain.entity.enums.Position;
import com.geulgrim.community.global.entity.BaseEntity;
import com.geulgrim.community.global.user.domain.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Getter @Setter
public class CrewRequest extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long crewRequestId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "crew_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Crew crew;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Enumerated(STRING)
    private Position position;

    @Enumerated(STRING)
    private CrewStatus status;

    private String message;

}
