package com.geulgrim.common.pushmail.domain;

import com.geulgrim.common.global.entity.BaseEntity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PushMail extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long receiverId;

    private Long senderId;

    private Long[] favoriteJobs;

    private PushMailDomain domain;

    private String title;

    private String content;

    private boolean isChecked;


    public void updateTitle(String nickname) {
        this.title = nickname = this.title;
    }

    public void updateContent(String jobTitle) {
        this.content = jobTitle + this.content;
    }
}
