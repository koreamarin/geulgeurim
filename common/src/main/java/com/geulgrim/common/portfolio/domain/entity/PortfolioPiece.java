package com.geulgrim.common.portfolio.domain.entity;

import com.geulgrim.common.piece.domain.entity.Piece;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import static jakarta.persistence.GenerationType.IDENTITY;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Getter
public class PortfolioPiece {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long pofolPieceId;

    @ManyToOne
    @JoinColumn(name = "pofol_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Portfolio portfolio;

    // 작품에서 선택
    @ManyToOne
    @JoinColumn(name = "piece_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Piece piece;

    private String title;
    private String program;
    private String contribution;
    private String content;

    // 사용자가 업로드한 이미지 URL
    private String fileUrl;

}
