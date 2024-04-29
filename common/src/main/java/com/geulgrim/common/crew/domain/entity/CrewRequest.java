package com.geulgrim.common.crew.domain.entity;

import com.geulgrim.common.crew.domain.entity.enums.CrewStatus;
import com.geulgrim.common.crew.domain.entity.enums.Position;
import com.geulgrim.common.global.domain.entity.BaseEntity;
import com.geulgrim.common.user.domain.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Getter
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
