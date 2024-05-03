package com.geulgrim.community.share.application.dto.response;

import com.geulgrim.community.global.file.entity.FileUrl;
import com.geulgrim.community.share.domain.entity.Share;
import com.geulgrim.community.share.domain.entity.ShareComment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShareDetailResponse {
    private Share share;
    private List<ShareComment> commentList;
    private List<FileUrl> urlList;
}
