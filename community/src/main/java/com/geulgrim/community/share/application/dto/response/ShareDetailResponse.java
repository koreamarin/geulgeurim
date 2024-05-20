package com.geulgrim.community.share.application.dto.response;

import com.geulgrim.community.share.domain.entity.Share;
import com.geulgrim.community.share.domain.entity.ShareComment;
import com.geulgrim.community.share.domain.entity.ShareImage;
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
    private ShareResponse share;
    private List<ShareCommentResponse> commentList;
    private List<ShareImageResponse> imageList;
}
