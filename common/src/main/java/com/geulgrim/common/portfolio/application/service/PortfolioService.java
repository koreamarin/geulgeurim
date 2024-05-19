package com.geulgrim.common.portfolio.application.service;


import com.geulgrim.common.global.s3.S3UploadService;
import com.geulgrim.common.piece.domain.entity.Piece;
import com.geulgrim.common.piece.domain.repository.PieceRepository;
import com.geulgrim.common.portfolio.application.dto.request.PieceInfo;
import com.geulgrim.common.portfolio.application.dto.request.PortfolioRequest;
import com.geulgrim.common.portfolio.application.dto.request.PortfolioRequestMyFormat;
import com.geulgrim.common.portfolio.application.dto.response.PieceInfoDetail;
import com.geulgrim.common.portfolio.application.dto.response.PortfolioResponse;
import com.geulgrim.common.portfolio.application.dto.response.PortfolioResponseDetail;
import com.geulgrim.common.portfolio.application.dto.response.PortfolioResponseDetailMyFormat;
import com.geulgrim.common.portfolio.domain.entity.Portfolio;
import com.geulgrim.common.portfolio.domain.entity.PortfolioFile;
import com.geulgrim.common.portfolio.domain.entity.PortfolioPiece;
import com.geulgrim.common.portfolio.domain.entity.enums.Format;
import com.geulgrim.common.portfolio.domain.entity.enums.OpenState;
import com.geulgrim.common.portfolio.domain.repository.PortfolioFileRepository;
import com.geulgrim.common.portfolio.domain.repository.PortfolioPieceRepository;
import com.geulgrim.common.portfolio.domain.repository.PortfolioRepository;
import com.geulgrim.common.portfolio.exception.PortfolioException;
import com.geulgrim.common.user.domain.entity.User;
import com.geulgrim.common.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.geulgrim.common.portfolio.exception.PortfolioErrorCode.NOT_EXISTS_PORTFOLIO;

@Slf4j
@RequiredArgsConstructor
@Service
public class PortfolioService {

    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;
    private final PortfolioFileRepository portfolioFileRepository;
    private final PortfolioPieceRepository portfolioPieceRepository;
    private final S3UploadService s3UploadService;
    private final PieceRepository pieceRepository;


    public List<PortfolioResponse> getPortfolios(Long userId) {

        List<Portfolio> portfolios = portfolioRepository.findAllByUserId(userId);

        return portfolios.stream()
                .map(portfolio -> {
                    PortfolioResponse response = new PortfolioResponse();
                    response.setPofolId(portfolio.getPofolId());
                    response.setPofolName(portfolio.getPofolName());
                    response.setOpenState(portfolio.getStatus());
                    response.setFormat(portfolio.getFormat());
                    response.setFileUrl(portfolio.getFileUrl());
                    response.setCreatedAt(LocalDate.from(portfolio.getCreatedAt()));
                    response.setUpdatedAt(LocalDate.from(portfolio.getUpdatedAt()));
                    return response;
                })
                .collect(Collectors.toList());

    }

    public List<PortfolioResponse> getOtherPortfolios(Long userId) {

        List<Portfolio> portfolios = portfolioRepository.findAllByUserId(userId);

        return portfolios.stream()
                .filter(portfolio -> portfolio.getStatus() == OpenState.PUBLIC)
                .map(portfolio -> {
                    PortfolioResponse response = new PortfolioResponse();
                    response.setPofolId(portfolio.getPofolId());
                    response.setPofolName(portfolio.getPofolName());
                    response.setOpenState(portfolio.getStatus());
                    response.setFormat(portfolio.getFormat());
                    response.setFileUrl(portfolio.getFileUrl());
                    response.setCreatedAt(LocalDate.from(portfolio.getCreatedAt()));
                    response.setUpdatedAt(LocalDate.from(portfolio.getUpdatedAt()));
                    return response;
                })
                .collect(Collectors.toList());

    }

    // 수정 필요
    public PortfolioResponseDetail getPortfolioDetail(Long pofolId) {

        Portfolio portfolio = portfolioRepository.findById(pofolId)
                .orElseThrow(() -> new PortfolioException(NOT_EXISTS_PORTFOLIO));

        ArrayList<PortfolioPiece> portfolioPieces = portfolioPieceRepository.findAllByPortfolio_PofolId(pofolId);
        ArrayList<PieceInfoDetail> pieces = new ArrayList<>();

        for (PortfolioPiece portfolioPiece : portfolioPieces) {
            if (portfolioPiece.getPiece() != null) {
                Piece piece = pieceRepository.findById(portfolioPiece.getPiece().getId())
                        .orElseThrow(() -> new IllegalArgumentException("해당 작품이 없습니다."));

                // 작품을 선택했다면
                pieces.add(PieceInfoDetail.builder()
                        .title(portfolioPiece.getTitle())
                        .program(portfolioPiece.getProgram())
                        .contribution(portfolioPiece.getContribution())
                        .content(portfolioPiece.getContent())
                        .pieceUrl(piece.getFileUrl())
                        .build());
            } else {
                // 파일을 업로드했다면
                pieces.add(PieceInfoDetail.builder()
                        .title(portfolioPiece.getTitle())
                        .program(portfolioPiece.getProgram())
                        .contribution(portfolioPiece.getContribution())
                        .content(portfolioPiece.getContent())
                        .pieceUrl(portfolioPiece.getFileUrl())
                        .build());
            }

        }

        return PortfolioResponseDetail.builder()
                .pofolId(portfolio.getPofolId())
                .pofolName(portfolio.getPofolName())
                .status(portfolio.getStatus())
                .pieces(pieces)
                .build();

    }

    public PortfolioResponseDetailMyFormat getPortfolioDetailMyFormat(Long pofolId) {

        Portfolio portfolio = portfolioRepository.findById(pofolId)
                .orElseThrow(() -> new PortfolioException(NOT_EXISTS_PORTFOLIO));

        // 포폴에 해당하는 사용자 업로드 파일 모두 가져오기
        ArrayList<PortfolioFile> portfolioFiles = portfolioFileRepository.findAllByPortfolio_PofolId(pofolId);
        ArrayList<String> fileUrls = new ArrayList<>();

        for(PortfolioFile file: portfolioFiles) {
            fileUrls.add(file.getFileUrl());
        }

        return PortfolioResponseDetailMyFormat.builder()
                .pofolId(portfolio.getPofolId())
                .pofolName(portfolio.getPofolName())
                .status(portfolio.getStatus())
                .fileUrls(fileUrls)
                .build();

    }


    // 글그림 포맷 등록 api 수정 필요
    public Long addPortfolio(Long userId, PortfolioRequest portfolioRequest) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

        // Portfolio 저장
        Portfolio portfolio = Portfolio.builder()
                .user(user)
                .pofolName(portfolioRequest.getPofolName())
                .status(portfolioRequest.getStatus())
                .format(Format.SERVICE)
                .build();

        portfolioRepository.save(portfolio);

        ArrayList<MultipartFile> files = portfolioRequest.getFiles();

        ArrayList<String> fileUrls = new ArrayList<>();
        // PortfolioPiece에 저장
        for (PieceInfo pieceInfo: portfolioRequest.getPieces()) {

            if (pieceInfo.getPieceId() == null) {
                // 사용자가 작품 선택을 하지 않고 파일을 업로드했다면, S3에 저장하고 그 url을 저장
                String fileUrl = "";
                try {
                    for (MultipartFile file: files) {
                        String filename = file.getOriginalFilename(); // 'city.jpg'
                        // identifier와 이미지 파일의 이름이 같다면 저장
                        if (filename != null && filename.equals(pieceInfo.getIdentifier())) {
                            fileUrl = s3UploadService.saveFile(file);
                            fileUrls.add(fileUrl);
                        }
                    }
                }  catch (IOException e) {
                    e.fillInStackTrace();
                }

                PortfolioPiece portfolioPiece = PortfolioPiece.builder()
                        .portfolio(portfolio)
                        .title(pieceInfo.getTitle())
                        .program(pieceInfo.getProgram())
                        .contribution(pieceInfo.getContribution())
                        .content(pieceInfo.getContent())
                        .fileUrl(fileUrl)
                        .build();

                portfolioPieceRepository.save(portfolioPiece);

            } else {
                // 작품을 선택했다면
                Piece piece = pieceRepository.findById(pieceInfo.getPieceId())
                        .orElseThrow(() -> new IllegalArgumentException("해당 작품이 없습니다."));

                fileUrls.add(piece.getFileUrl());

                PortfolioPiece portfolioPiece = PortfolioPiece.builder()
                        .portfolio(portfolio)
                        .piece(piece)
                        .title(pieceInfo.getTitle())
                        .program(pieceInfo.getProgram())
                        .contribution(pieceInfo.getContribution())
                        .content(pieceInfo.getContent())
                        .fileUrl(piece.getFileUrl())
                        .build();

                portfolioPieceRepository.save(portfolioPiece);
            }

        }

        // 위의 로직에 따르면, fileUrl이 null 임.
        portfolio.setFileUrl(fileUrls.get(0));
        portfolioRepository.save(portfolio);

        return portfolio.getPofolId();

    }


    public Long addPortfolioMyFormat(Long userId, PortfolioRequestMyFormat portfolioRequest) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

        List<String> fileUrls = new ArrayList<>();
        for (MultipartFile file : portfolioRequest.getFileList()) {
            try {
                String fileUrl = s3UploadService.saveFile(file);
                fileUrls.add(fileUrl);
            }  catch (IOException e) {
                e.fillInStackTrace();
            }
        }

        Portfolio portfolio = Portfolio.builder()
                .user(user)
                .pofolName(portfolioRequest.getPofolName())
                .status(portfolioRequest.getStatus())
                .format(Format.USER)
                .fileUrl(fileUrls.get(0))
                .build();

        portfolioRepository.save(portfolio);

        List<PortfolioFile> portfolioFiles = new ArrayList<>();
        for (String fileUrl : fileUrls) {
            PortfolioFile portfolioFile = PortfolioFile.builder()
                    .fileUrl(fileUrl)
                    .portfolio(portfolio)
                    .build();
            portfolioFiles.add(portfolioFile);
        }

        portfolioFileRepository.saveAll(portfolioFiles);

        return portfolio.getPofolId();
    }


    public String deletePortfolio(Long pofolId) {
        Portfolio portfolio = portfolioRepository.findById(pofolId)
                .orElseThrow(() -> new PortfolioException(NOT_EXISTS_PORTFOLIO));

        portfolioRepository.delete(portfolio);

        return "포트폴리오가 성공적으로 삭제되었습니다.";

    }

}
