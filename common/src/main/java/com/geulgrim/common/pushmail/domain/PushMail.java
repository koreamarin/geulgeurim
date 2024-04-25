package com.geulgrim.common.pushmail.domain;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PushMail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long receiverId;

    private Long senderId;

    @ElementCollection
    private List<Long> favoriteJobList; //즐겨찾기 공고 리스트

    private PushMailDomain domain;

    private String title;

    private String content;

    private boolean isChecked;


    public void updateTitle(String nickname) {
        this.title = nickname + this.title;
    }

    public void updateContent(String jobTitle) {
        this.content = jobTitle + this.content;
    }
}
