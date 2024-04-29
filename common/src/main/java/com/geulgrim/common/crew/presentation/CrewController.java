package com.geulgrim.common.crew.presentation;

import com.geulgrim.common.crew.application.dto.request.CrewBoardRequest;
import com.geulgrim.common.crew.application.dto.response.CrewBoardDetail;
import com.geulgrim.common.crew.application.service.CrewService;
import com.geulgrim.common.portfolio.application.dto.response.PortfolioResponseDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/v1/crew")
@RestController
public class CrewController {

    private final CrewService crewService;

    // 크루 모집 상세 조회
    @GetMapping("/detail/{crew_id}")
    public ResponseEntity<CrewBoardDetail> getCrewBoardDetail(
            @PathVariable("crew_id") Long crewId
    ) {
        CrewBoardDetail detail = crewService.getCrewBoardDetail(crewId);
        return ResponseEntity.ok(detail);
    }

    // 크루 모집 등록
    @PostMapping("/{userId}")
    public ResponseEntity<Long> addCrewBoard(
            @RequestBody CrewBoardRequest crewBoardRequest,
            @PathVariable("userId") Long userId
    ) {
        Long crewId = crewService.addCrewBoard(userId, crewBoardRequest);
        return ResponseEntity.ok(crewId);
    }


}
