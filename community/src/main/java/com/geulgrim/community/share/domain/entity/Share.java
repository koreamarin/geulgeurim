package com.geulgrim.community.share.domain.entity;

import com.geulgrim.community.global.entity.BaseEntity;
import com.geulgrim.community.global.user.domain.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Share extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long shareId;
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;
    private String title;
    private String content;
    private long hit;

    @OneToMany(mappedBy = "share", cascade = CascadeType.ALL, fetch = LAZY)
    private List<ShareComment> commentList;

    @OneToMany(mappedBy = "share", cascade = CascadeType.ALL, fetch = LAZY)
    private List<ShareImage> imageList;
}
