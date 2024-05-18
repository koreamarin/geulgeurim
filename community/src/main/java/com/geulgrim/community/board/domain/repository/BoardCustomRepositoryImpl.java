package com.geulgrim.community.board.domain.repository;

import com.geulgrim.community.board.application.dto.response.BoardListResponse;
import com.geulgrim.community.board.domain.entity.Board;
import com.geulgrim.community.board.domain.entity.QBoard;
import com.geulgrim.community.global.user.domain.entity.QUser;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.stream.Collectors;

public class BoardCustomRepositoryImpl implements BoardCustomRepository{
    private final JPAQueryFactory queryFactory;

    public BoardCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<BoardListResponse> searchBoards(String keyword, String searchType, Pageable pageable) {
        QBoard board = QBoard.board;
        QUser user = QUser.user;

        BooleanExpression predicate = createPredicate(keyword, searchType, board, user);

        List<Board> boards = queryFactory.selectFrom(board)
                .leftJoin(board.user, user)
                .where(predicate)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<BoardListResponse> boardListResponses = boards.stream().map(b ->
                BoardListResponse.builder()
                        .boardId(b.getBoardId())
                        .userId(b.getUser().getUserId())
                        .userNickname(b.getUser().getNickname())
                        .title(b.getTitle())
                        .hit(b.getHit())
                        .commentCnt(b.getCommentList().size())
                        .createdAt(b.getCreatedAt())
                        .updatedAt(b.getUpdatedAt())
                        .build()
        ).collect(Collectors.toList());

        long total = queryFactory.selectFrom(board)
                .leftJoin(board.user, user)
                .where(predicate)
                .fetchCount();

        return new PageImpl<>(boardListResponses, pageable, total);
    }

    private BooleanExpression createPredicate(String keyword, String searchType, QBoard board, QUser user) {
        if (!StringUtils.hasText(keyword)) {
            return null;
        }

        switch (searchType) {
            case "title":
                return board.title.containsIgnoreCase(keyword);
            case "title+content":
                return board.title.containsIgnoreCase(keyword).or(board.content.containsIgnoreCase(keyword));
            case "writer":
                return user.nickname.containsIgnoreCase(keyword);
            default:
                return null;
        }
    }
}
