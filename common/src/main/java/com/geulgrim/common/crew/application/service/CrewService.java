package com.geulgrim.common.crew.application.service;

import com.geulgrim.common.crew.application.dto.request.CrewBoardRequest;
import com.geulgrim.common.crew.application.dto.response.CrewBoardDetail;
import com.geulgrim.common.crew.domain.entity.Crew;
import com.geulgrim.common.crew.domain.repository.CrewRepository;
import com.geulgrim.common.crew.exception.CrewException;
import com.geulgrim.common.user.domain.entity.User;
import com.geulgrim.common.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static com.geulgrim.common.crew.exception.CrewErrorCode.NOT_EXISTS_CREW_BOARD;
import static com.geulgrim.common.portfolio.exception.PortfolioErrorCode.NOT_EXISTS_PORTFOLIO;

@Slf4j
@RequiredArgsConstructor
@Service
public class CrewService {

    private final CrewRepository crewRepository;
    private final UserRepository userRepository;

    public CrewBoardDetail getCrewBoardDetail(Long crewId) {

        Crew crew = crewRepository.findById(crewId)
                .orElseThrow(() -> new CrewException(NOT_EXISTS_CREW_BOARD));

        CrewBoardDetail crewBoardDetail = CrewBoardDetail.builder()
                .crewId(crew.getCrewId())
                .projectName(crew.getProjectName())
                .content(crew.getContent())
                .pen(crew.getPen())
                .color(crew.getColor())
                .bg(crew.getBg())
                .pd(crew.getPd())
                .story(crew.getStory())
                .conti(crew.getConti())
                .status(crew.getStatus())
                .build();

        // 이미지 넣기


        // crew 넣기

        return crewBoardDetail;

    }


    public Long addCrewBoard(Long userId, CrewBoardRequest crewBoardRequest) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));
        // 추후 user exception 만들어서 수정해야 함

        Crew crew = Crew.builder()
                .projectName(crewBoardRequest.getProjectName())
                .content(crewBoardRequest.getContent())
                .pen(crewBoardRequest.getPen())
                .color(crewBoardRequest.getColor())
                .bg(crewBoardRequest.getBg())
                .pd(crewBoardRequest.getPd())
                .story(crewBoardRequest.getStory())
                .conti(crewBoardRequest.getConti())
                .status(crewBoardRequest.getStatus())
                .build();

        crewRepository.save(crew);

        return crew.getCrewId();

    }



}
