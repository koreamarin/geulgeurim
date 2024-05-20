package com.geulgrim.community.crew.domain.repository;


import com.geulgrim.community.crew.domain.entity.Crew;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.geulgrim.community.crew.domain.entity.QCrew.crew;


@Repository
public class CrewDslRepository {

    @Autowired
    private JPAQueryFactory queryFactory;

    public List<Crew> search(String keyword, String category) {
        JPAQuery<Crew> query = queryFactory.selectFrom(crew)
                .leftJoin(crew.user)
                .fetchJoin();

        BooleanExpression keywordPredicate = crew.projectName.contains(keyword);
        Predicate categoryPredicate = switch (category) {
            case "PEN" -> crew.pen.goe(1);
            case "COLOR" -> crew.color.goe(1);
            case "BG" -> crew.bg.goe(1);
            case "PD" -> crew.pd.goe(1);
            case "STORY" -> crew.story.goe(1);
            case "CONTI" -> crew.conti.goe(1);
            default -> null;
        };

        if (categoryPredicate != null) {
            query.where(keywordPredicate.and(categoryPredicate));
        } else {
            query.where(keywordPredicate);
        }
        return query.fetch();

    }
}
