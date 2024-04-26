package com.geulgrim.common.portfolio.entity;

import com.geulgrim.common.global.entity.BaseEntity;
import com.geulgrim.common.portfolio.entity.enums.OpenState;
import com.geulgrim.common.user.doamin.User;
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
public class Portfolio extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column
    private Long pofolId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    private String pofolName;

    @Enumerated(STRING)
    private OpenState status;

    private String fileUrl;
}
