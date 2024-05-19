package com.geulgrim.common.piece.application.dto.response;

import com.geulgrim.common.piece.domain.entity.enums.PieceType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PieceResponseDto {

    private Long id;

    private Long ownerId;

    private String fileUrl;

    private String name;

    private String description;

    private PieceType type;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
