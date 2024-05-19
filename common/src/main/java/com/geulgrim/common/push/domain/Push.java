package com.geulgrim.common.push.domain;

import com.geulgrim.common.global.domain.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Push extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long receiverId;

    private Long senderId;

    @OneToMany(mappedBy = "push")
    private List<FavoriteJob> favoriteJobList; //즐겨찾기 공고 리스트

    @Enumerated(value = EnumType.STRING)
    private PushDomain domain;

    private String title;

    private String content;

    public void updateTitle(String nickname) {
        this.title = nickname + this.title;
    }

    public void updateContent(String jobTitle) {
        this.content = jobTitle + this.content;
    }


}
