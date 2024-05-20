package com.geulgrim.community.board.domain.repository;

import com.geulgrim.community.board.application.dto.response.BoardCommentResponse;
import com.geulgrim.community.board.application.dto.response.BoardListResponse;
import com.geulgrim.community.board.domain.entity.Board;
import com.geulgrim.community.board.domain.entity.QBoard;
import com.geulgrim.community.board.domain.entity.QBoardComment;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class BoardCustomRepositoryImpl implements BoardCustomRepository {

    private final JPAQueryFactory queryFactory;

    public BoardCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<BoardListResponse> searchBoards(String keyword, String searchType, String sort, Pageable pageable) {
        QBoard board = QBoard.board;
        QUser user = QUser.user;

        BooleanExpression predicate = createPredicate(keyword, searchType, board, user);
        OrderSpecifier<?> orderSpecifier = getOrderSpecifier(sort, board);

        List<Board> boards = queryFactory.selectFrom(board)
                .leftJoin(board.user, user)
                .where(predicate)
                .orderBy(orderSpecifier)
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

    @Override
    public Page<BoardListResponse> findBoardResponseList(Pageable pageable) {
        QBoard board = QBoard.board;
        QBoardComment comment = QBoardComment.boardComment;
        QUser user = QUser.user;

        List<BoardListResponse> results = queryFactory
                .select(Projections.constructor(BoardListResponse.class,
                        board.boardId,
                        board.user.userId,
                        board.user.nickname,
                        board.title,
                        board.hit,
                        comment.count(),
                        board.createdAt,
                        board.updatedAt))
                .from(board)
                .leftJoin(board.commentList, comment)
                .leftJoin(board.user, user)
                .groupBy(board.boardId, board.user.userId, board.user.nickname, board.title, board.hit, board.createdAt, board.updatedAt)
                .orderBy(board.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = queryFactory
                .from(board)
                .fetchCount();

        return new PageImpl<>(results, pageable, total);
    }

    @Override
    public Page<BoardListResponse> myBoards(long userId, String keyword, String searchType, String sort, Pageable pageable) {
        QBoard board = QBoard.board;
        QBoardComment comment = QBoardComment.boardComment;
        QUser user = QUser.user;

        BooleanExpression predicate = createMyBoardPredicate(keyword, searchType, board, userId);
        OrderSpecifier<?> orderSpecifier = getOrderSpecifier(sort, board);

        List<BoardListResponse> results = queryFactory
                .select(Projections.constructor(BoardListResponse.class,
                        board.boardId,
                        board.user.userId,
                        board.user.nickname,
                        board.title,
                        board.hit,
                        comment.count(),
                        board.createdAt,
                        board.updatedAt))
                .from(board)
                .leftJoin(board.commentList, comment)
                .leftJoin(board.user, user)
                .where(predicate)
                .groupBy(board.boardId, board.user.userId, board.user.nickname, board.title, board.hit, board.createdAt, board.updatedAt)
                .orderBy(orderSpecifier)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long total = queryFactory
                .select(board.count())
                .from(board)
                .where(predicate)
                .fetchOne();

        return new PageImpl<>(results, pageable, total);
    }

    @Override
    public Page<BoardListResponse> myBoards(long userId, Pageable pageable) {
        QBoard board = QBoard.board;
        QBoardComment comment = QBoardComment.boardComment;
        QUser user = QUser.user;

        List<BoardListResponse> results = queryFactory
                .select(Projections.constructor(BoardListResponse.class,
                        board.boardId,
                        board.user.userId,
                        board.user.nickname,
                        board.title,
                        board.hit,
                        comment.count(),
                        board.createdAt,
                        board.updatedAt))
                .from(board)
                .leftJoin(board.commentList, comment)
                .leftJoin(board.user, user)
                .where(board.user.userId.eq(userId)) // Filter boards by user ID
                .groupBy(board.boardId, board.user.userId, board.user.nickname, board.title, board.hit, board.createdAt, board.updatedAt)
                .orderBy(board.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = queryFactory
                .from(board)
                .fetchCount();

        return new PageImpl<>(results, pageable, total);
    }

    @Override
    public Page<BoardCommentResponse> myComments(long userId, String keyword, String sort, Pageable pageable) {
        QBoardComment comment = QBoardComment.boardComment;
        QBoard board = QBoard.board;
        QUser user = QUser.user;

        BooleanExpression predicate = createCommentPredicate(userId, keyword, comment, board, user);
        OrderSpecifier<?> orderSpecifier = getCommentOrderSpecifier(sort, comment);

        List<BoardCommentResponse> results = queryFactory
                .select(Projections.constructor(BoardCommentResponse.class,
                        comment.boardCommentId,
                        comment.user.userId,
                        comment.user.nickname,
                        comment.user.fileUrl,
                        comment.content,
                        comment.board.boardId,
                        comment.createdAt,
                        comment.updatedAt
                ))
                .from(comment)
                .leftJoin(comment.board, board)
                .leftJoin(comment.user, user)
                .where(predicate)
                .orderBy(orderSpecifier)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long total = queryFactory
                .select(comment.count())
                .from(comment)
                .where(predicate)
                .fetchOne();

        return new PageImpl<>(results, pageable, total);
    }

    @Override
    public Page<BoardCommentResponse> myComments(long userId, Pageable pageable) {
        QBoardComment comment = QBoardComment.boardComment;
        QBoard board = QBoard.board;
        QUser user = QUser.user;

        List<BoardCommentResponse> results = queryFactory
                .select(Projections.constructor(BoardCommentResponse.class,
                        comment.boardCommentId,
                        comment.user.userId,
                        comment.user.nickname,
                        comment.user.fileUrl,
                        comment.content,
                        comment.board.boardId,
                        comment.createdAt,
                        comment.updatedAt
                        ))
                .from(comment)
                .leftJoin(comment.board, board)
                .leftJoin(comment.user, user)
                .where(comment.user.userId.eq(userId)) // Filter boards by user ID
                .groupBy(comment.boardCommentId, comment.user.userId, board.user.nickname, comment.user.fileUrl, board.content, comment.createdAt, comment.updatedAt)
                .orderBy(board.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = queryFactory
                .from(board)
                .fetchCount();

        return new PageImpl<>(results, pageable, total);
    }


    private BooleanExpression createPredicate(String keyword, String searchType, QBoard board, QUser user) {
        if (!StringUtils.hasText(keyword)) {
            return null;
        }

        switch (searchType) {
            case "title":
                return board.title.containsIgnoreCase(keyword);
            case "content":
                return board.content.containsIgnoreCase(keyword);
            case "title+content":
                return board.title.containsIgnoreCase(keyword).or(board.content.containsIgnoreCase(keyword));
            case "author":
                return user.nickname.containsIgnoreCase(keyword);
            default:
                return null;
        }
    }

    private BooleanExpression createMyBoardPredicate(String keyword, String searchType, QBoard board, long userId) {
        BooleanExpression predicate = board.user.userId.eq(userId);
        if (!StringUtils.hasText(keyword)) {
            return predicate;
        }

        switch (searchType) {
            case "title":
                return predicate.and(board.title.containsIgnoreCase(keyword));
            case "content":
                return predicate.and(board.content.containsIgnoreCase(keyword));
            case "title+content":
                return predicate.and(board.title.containsIgnoreCase(keyword).or(board.content.containsIgnoreCase(keyword)));
            default:
                return predicate;
        }
    }

    private OrderSpecifier<?> getOrderSpecifier(String sort, QBoard board) {
        switch (sort) {
            case "latest":
                return board.createdAt.desc();
            case "oldest":
                return board.createdAt.asc();
            case "popular":
                return board.hit.desc();
            default:
                return board.createdAt.desc(); // Default sorting
        }
    }

    private BooleanExpression createCommentPredicate(long userId, String keyword, QBoardComment comment, QBoard board, QUser user) {
        BooleanExpression predicate = comment.user.userId.eq(userId);

        if (keyword != null && !keyword.isEmpty()) {
            predicate = predicate.and(comment.content.containsIgnoreCase(keyword));
        }
        return predicate;
    }

    private OrderSpecifier<?> getCommentOrderSpecifier(String sort, QBoardComment comment) {
        if (sort == null || sort.isEmpty()) {
            return comment.createdAt.desc();
        }

        switch (sort) {
            case "oldest":
                return comment.createdAt.asc();
            case "latest":
                return comment.createdAt.desc();
            default:
                return comment.createdAt.desc();
        }
    }
}
