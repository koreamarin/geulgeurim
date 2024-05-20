package com.geulgrim.auth.user.domain.entity;

import com.geulgrim.auth.user.domain.entity.Enums.UserType;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long user_id;
    @Column(nullable = false, length = 31)
    private String email;
    @Column(nullable = true, length = 15)
    private String birthday;
    @Column(nullable = true, length = 15)
    private String name;
    @Column(nullable = false, length = 31)
    private String nickname;
    @Column(nullable = true, length = 255)
    private String wallet;
    @Column(nullable = false, length = 10)
    @Enumerated(STRING)
    private UserType userType;
    @Column(nullable = true, length = 255)
    private String file_url;
    @Column(nullable = true, length = 20)
    private String phone_num;

    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE, fetch=FetchType.LAZY)
    private EnterUser enterUser;

    private String fcmToken;

    public void updateFcmToken(String fcmToken) {
        this.fcmToken = fcmToken;
    }

}
