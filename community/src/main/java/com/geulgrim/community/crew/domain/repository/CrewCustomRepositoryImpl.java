package com.geulgrim.community.crew.domain.repository;

import com.geulgrim.community.crew.application.dto.response.CrewImageResponse;
import com.geulgrim.community.crew.application.dto.response.CrewListResponse;
import com.geulgrim.community.crew.application.dto.response.MyApplyListResponse;
import com.geulgrim.community.crew.application.dto.response.MyCrewListResponse;
import com.geulgrim.community.crew.domain.entity.*;
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

public class CrewCustomRepositoryImpl implements CrewCustomRepository {

    private final JPAQueryFactory queryFactory;

    public CrewCustomRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Page<CrewListResponse> searchCrews(String keyword, String searchType, String sort, Pageable pageable) {
        QCrew crew = QCrew.crew;
        QCrewImage crewImage = QCrewImage.crewImage;
        QUser user = QUser.user;

        BooleanExpression predicate = createPredicate(keyword, searchType, crew, user);
        OrderSpecifier<?> orderSpecifier = getOrderSpecifier(sort, crew);

        List<Crew> crews = queryFactory.selectFrom(crew)
                .leftJoin(crew.user, user).fetchJoin()
                .where(predicate)
                .orderBy(orderSpecifier)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        List<CrewListResponse> crewListResponses = crews.stream().map(c -> {
            List<CrewImageResponse> imageList = queryFactory.selectFrom(crewImage)
                    .where(crewImage.crew.eq(c))
                    .fetch()
                    .stream()
                    .map(ci -> new CrewImageResponse(ci.getCrewImageId(), ci.getFileUrl()))
                    .collect(Collectors.toList());

            return new CrewListResponse(
                    c.getCrewId(),
                    c.getUser().getUserId(),
                    c.getUser().getNickname(),
                    c.getUser().getFileUrl(),
                    c.getProjectName(),
                    imageList,
                    c.getPen(),
                    c.getColor(),
                    c.getBg(),
                    c.getPd(),
                    c.getStory(),
                    c.getConti(),
                    c.getStatus(),
                    c.getCreatedAt(),
                    c.getUpdatedAt()
            );
        }).collect(Collectors.toList());

        long total = queryFactory.selectFrom(crew)
                .leftJoin(crew.user, user)
                .where(predicate)
                .fetchCount();

        return new PageImpl<>(crewListResponses, pageable, total);
    }

    @Override
    public Page<CrewListResponse> findCrewResponseList(Pageable pageable) {
        QCrew crew = QCrew.crew;
        QCrewImage crewImage = QCrewImage.crewImage;
        QUser user = QUser.user;

        List<CrewListResponse> results = queryFactory
                .selectFrom(crew)
                .leftJoin(crew.user, user).fetchJoin()
                .orderBy(crew.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch()
                .stream()
                .map(c -> {
                    List<CrewImageResponse> imageList = queryFactory.selectFrom(crewImage)
                            .where(crewImage.crew.eq(c))
                            .fetch()
                            .stream()
                            .map(ci -> new CrewImageResponse(ci.getCrewImageId(), ci.getFileUrl()))
                            .collect(Collectors.toList());

                    return new CrewListResponse(
                            c.getCrewId(),
                            c.getUser().getUserId(),
                            c.getUser().getNickname(),
                            c.getUser().getFileUrl(),
                            c.getProjectName(),
                            imageList,
                            c.getPen(),
                            c.getColor(),
                            c.getBg(),
                            c.getPd(),
                            c.getStory(),
                            c.getConti(),
                            c.getStatus(),
                            c.getCreatedAt(),
                            c.getUpdatedAt()
                    );
                })
                .collect(Collectors.toList());

        long total = queryFactory.selectFrom(crew)
                .leftJoin(crew.user, user)
                .fetchCount();

        return new PageImpl<>(results, pageable, total);
    }

    @Override
    public Page<MyCrewListResponse> findMyCrewResponseList(long userId, Pageable pageable) {
        QCrew crew = QCrew.crew;
        QCrewRequest crewRequest = QCrewRequest.crewRequest;
        List<MyCrewListResponse> content = queryFactory
                .select(Projections.constructor(MyCrewListResponse.class,
                        crew.crewId,
                        crew.projectName,
                        crewRequest.count().as("applyCnt")))
                .from(crew)
                .leftJoin(crewRequest).on(crew.crewId.eq(crewRequest.crew.crewId))
                .where(crew.user.userId.eq(userId))
                .groupBy(crew.crewId, crew.projectName)
                .orderBy(crew.createdAt.desc()) // Modify this line for custom sorting if needed
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long total = queryFactory
                .select(crew.countDistinct())
                .from(crew)
                .join(crewRequest).on(crew.crewId.eq(crewRequest.crew.crewId))
                .where(crewRequest.user.userId.eq(userId))
                .fetchOne();

        return new PageImpl<>(content, pageable, total);
    }

    @Override
    public Page<MyApplyListResponse> findMyApplyResponseList(long userId, Pageable pageable){
        QCrewRequest crewRequest = QCrewRequest.crewRequest;
        List<MyApplyListResponse> content = queryFactory
                .select(Projections.constructor(MyApplyListResponse.class,
                        crewRequest.crewRequestId,
                        crewRequest.message,
                        crewRequest.status,
                        crewRequest.crew.crewId))
                .from(crewRequest)
                .where(crewRequest.user.userId.eq(userId))
                .orderBy(crewRequest.createdAt.desc()) // Modify this line for custom sorting if needed
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long total = queryFactory
                .select(crewRequest.countDistinct())
                .from(crewRequest)
                .where(crewRequest.user.userId.eq(userId))
                .fetchOne();

        return new PageImpl<>(content, pageable, total);
    }

    private BooleanExpression createPredicate(String keyword, String searchType, QCrew crew, QUser user) {
        if (!StringUtils.hasText(keyword)) {
            return null;
        }

        switch (searchType) {
            case "title":
                return crew.projectName.containsIgnoreCase(keyword);
            case "content":
                return crew.content.containsIgnoreCase(keyword);
            case "author":
                return user.nickname.containsIgnoreCase(keyword);
            case "title+content":
                return crew.projectName.containsIgnoreCase(keyword).or(crew.content.containsIgnoreCase(keyword));
            default:
                return null;
        }
    }

    private OrderSpecifier<?> getOrderSpecifier(String sort, QCrew crew) {
        switch (sort) {
            case "latest":
                return crew.createdAt.desc();
            case "oldest":
                return crew.createdAt.asc();
            default:
                return crew.createdAt.desc(); // Default sorting
        }
    }
}
