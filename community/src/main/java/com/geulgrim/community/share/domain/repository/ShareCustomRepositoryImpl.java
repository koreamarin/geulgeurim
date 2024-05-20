package com.geulgrim.community.share.domain.repository;

import com.geulgrim.community.share.application.dto.response.ShareImageResponse;
import com.geulgrim.community.share.application.dto.response.ShareListResponse;
import com.geulgrim.community.share.domain.entity.QShareImage;
import com.geulgrim.community.share.domain.entity.Share;
import com.geulgrim.community.share.domain.entity.QShare;
import com.geulgrim.community.share.domain.entity.QShareComment;
import com.geulgrim.community.global.user.domain.entity.QUser;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

public class ShareCustomRepositoryImpl implements ShareCustomRepository {

    private final JPAQueryFactory queryFactory;

    public ShareCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<ShareListResponse> searchShares(String keyword, String searchType, String sort, Pageable pageable) {
        QShare share = QShare.share;
        QShareImage shareImage = QShareImage.shareImage;
        QUser user = QUser.user;

        BooleanExpression predicate = createPredicate(keyword, searchType, share, user);
        OrderSpecifier<?> orderSpecifier = getOrderSpecifier(sort, share);

        List<Share> shares = queryFactory.selectFrom(share)
                .leftJoin(share.user, user).fetchJoin()
                .leftJoin(share.imageList, shareImage).fetchJoin()
                .where(predicate)
                .orderBy(orderSpecifier)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<ShareListResponse> shareListResponses = shares.stream().map(s -> {
            List<ShareImageResponse> imageResponses = s.getImageList().stream()
                    .map(image -> new ShareImageResponse(image.getShareImageId(), image.getFileUrl()))
                    .collect(Collectors.toList());

            return new ShareListResponse(
                    s.getShareId(),
                    s.getUser().getUserId(),
                    s.getUser().getNickname(),
                    s.getUser().getFileUrl(),
                    s.getTitle(),
                    s.getHit(),
                    s.getCommentList().size(),
                    s.getCreatedAt(),
                    s.getUpdatedAt(),
                    imageResponses
            );
        }).collect(Collectors.toList());

        long total = queryFactory.selectFrom(share)
                .leftJoin(share.user, user)
                .where(predicate)
                .fetchCount();

        return new PageImpl<>(shareListResponses, pageable, total);
    }

    @Override
    public Page<ShareListResponse> findShareResponseList(Pageable pageable) {
        QShare share = QShare.share;
        QShareComment comment = QShareComment.shareComment;
        QUser user = QUser.user;

        List<ShareListResponse> results = queryFactory
                .select(Projections.constructor(ShareListResponse.class,
                        share.shareId,
                        share.user.userId,
                        share.user.nickname,
                        share.user.fileUrl,
                        share.title,
                        share.hit,
                        comment.count(),
                        share.createdAt,
                        share.updatedAt,
                        share.imageList))
                .from(share)
                .leftJoin(share.commentList, comment)
                .leftJoin(share.user, user)
                .groupBy(share.shareId, share.user.userId, share.user.nickname, share.user.fileUrl, share.title, share.hit, share.createdAt, share.updatedAt, share.imageList)
                .orderBy(share.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = queryFactory
                .from(share)
                .fetchCount();

        return new PageImpl<>(results, pageable, total);
    }

    private BooleanExpression createPredicate(String keyword, String searchType, QShare share, QUser user) {
        if (!StringUtils.hasText(keyword)) {
            return null;
        }

        switch (searchType) {
            case "title":
                return share.title.containsIgnoreCase(keyword);
            case "content":
                return share.content.containsIgnoreCase(keyword);
            case "title+content":
                return share.title.containsIgnoreCase(keyword).or(share.content.containsIgnoreCase(keyword));
            case "author":
                return user.nickname.containsIgnoreCase(keyword);
            default:
                return null;
        }
    }

    private OrderSpecifier<?> getOrderSpecifier(String sort, QShare share) {
        switch (sort) {
            case "latest":
                return share.createdAt.desc();
            case "oldest":
                return share.createdAt.asc();
            case "popular":
                return share.hit.desc();
            default:
                return share.createdAt.desc(); // Default sorting
        }
    }
}
