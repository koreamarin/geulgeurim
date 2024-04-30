package com.geulgrim.common.crew.domain.repository;

import com.geulgrim.common.crew.domain.entity.Crew;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.geulgrim.common.crew.domain.entity.QCrew.crew;

@Repository
public class CrewDslRepository {

    @Autowired
    private JPAQueryFactory queryFactory;

    public List<Crew> search(String keyword) {
        return queryFactory
                .selectFrom(crew)
                .leftJoin(crew.user)
                .fetchJoin()
                .where(
                        crew.projectName.contains(keyword)
                )
                .fetch();
    }
}
