package com.geulgrim.community.crew.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import static jakarta.persistence.FetchType.EAGER;
import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Getter
public class CrewImage {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long crewImageId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "crew_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Crew crew;

    private String fileUrl;
}
