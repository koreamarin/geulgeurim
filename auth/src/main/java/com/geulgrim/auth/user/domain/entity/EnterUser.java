package com.geulgrim.auth.user.domain.entity;

import com.geulgrim.auth.user.domain.entity.Enums.Status;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import static jakarta.persistence.EnumType.STRING;
import static jakarta.persistence.GenerationType.IDENTITY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class EnterUser{

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id", referencedColumnName = "user_id")
    private User user;

    @Column(nullable = false)
    private String password;

    @Column(name="company_num", nullable = false, length = 17)
    private String companyNum;

    @Column(nullable = false, length = 127)
    private String address;

    @Column(nullable = false, length = 15)
    private String manager;

    @Column(nullable = false, length = 5)
    @Enumerated(STRING)
    private Status status;

    private String introduce;

    @Column(nullable = false)
    private String file_url;


}
