package com.geulgrim.community.crew.domain.repository;

import com.geulgrim.community.crew.application.dto.response.CrewImageResponse;
import com.geulgrim.community.crew.application.dto.response.CrewListResponse;
import com.geulgrim.community.crew.domain.entity.Crew;
import com.geulgrim.community.crew.domain.entity.CrewImage;
import com.geulgrim.community.crew.domain.entity.QCrew;
import com.geulgrim.community.crew.domain.entity.QCrewImage;
import com.geulgrim.community.global.user.domain.entity.QUser;
import com.querydsl.core.types.OrderSpecifier;
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
