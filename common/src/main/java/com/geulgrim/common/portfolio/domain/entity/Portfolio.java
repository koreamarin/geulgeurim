package com.geulgrim.common.portfolio.domain.entity;

import com.geulgrim.common.global.domain.entity.BaseEntity;
import com.geulgrim.common.portfolio.domain.entity.enums.Format;
import com.geulgrim.common.portfolio.domain.entity.enums.OpenState;
import com.geulgrim.common.user.domain.entity.User;
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
public class Portfolio extends BaseEntity {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    @Column
    private Long pofolId;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @Column
    private String pofolName;

    @Enumerated(STRING)
    @Column
    private OpenState status;

    @Column
    private String fileUrl;

    @Enumerated(STRING)
    @Column
    private Format format;
}
