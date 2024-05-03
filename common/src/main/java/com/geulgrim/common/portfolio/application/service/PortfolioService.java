package com.geulgrim.common.portfolio.application.service;

import com.geulgrim.common.global.domain.entity.FileUrl;
import com.geulgrim.common.global.domain.repository.FileUrlRepository;
import com.geulgrim.common.global.s3.S3UploadService;
import com.geulgrim.common.piece.domain.entity.Piece;
import com.geulgrim.common.piece.domain.repository.PieceRepository;
import com.geulgrim.common.portfolio.application.dto.request.PieceInfo;
import com.geulgrim.common.portfolio.application.dto.request.PortfolioRequest;
import com.geulgrim.common.portfolio.application.dto.request.PortfolioRequestMyFormat;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
                    response.setStatus(portfolio.getStatus());
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
                    response.setStatus(portfolio.getStatus());
                    return response;
                })
                .collect(Collectors.toList());

    }

    public PortfolioResponseDetail getPortfolioDetail(Long pofolId) {

        Portfolio portfolio = portfolioRepository.findById(pofolId)
                .orElseThrow(() -> new PortfolioException(NOT_EXISTS_PORTFOLIO));

        ArrayList<PortfolioPiece> portfolioPieces = portfolioPieceRepository.findAllByPortfolio_PofolId(pofolId);
        ArrayList<PieceInfo> pieces = new ArrayList<>();

        for (PortfolioPiece portfolioPiece : portfolioPieces) {
            pieces.add(PieceInfo.builder()
                    .title(portfolioPiece.getTitle())
                    .program(portfolioPiece.getProgram())
                    .contribution(portfolioPiece.getContribution())
                    .content(portfolioPiece.getContent())
                    .pieceUrl(portfolioPiece.getPieceUrl())
                    .build());
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


    public Long addPortfolio(Long userId, PortfolioRequest portfolioRequest) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));
        // 추후 user exception 만들어서 수정해야 함

        // Portfolio 저장
        Portfolio portfolio = new Portfolio();
        if (portfolioRequest.getPieces().get(0).getPieceId() == null) {
            // 사용자가 작품 선택을 하지 않고 파일을 업로드했다면,
            portfolio = Portfolio.builder()
                    .user(user)
                    .pofolName(portfolioRequest.getPofolName())
                    .status(portfolioRequest.getStatus())
                    .format(Format.SERVICE)
                    // fileUrl은 S3에 저장하고 그 중 첫 번째 이미지로 선택.
                    .build();

        } else {
            // 작품을 선택했다면
            Piece piece = pieceRepository.findById(portfolioRequest.getPieces().get(0).getPieceId())
                    .orElseThrow(() -> new IllegalArgumentException("해당 작품이 없습니다."));

            portfolio = Portfolio.builder()
                    .user(user)
                    .pofolName(portfolioRequest.getPofolName())
                    .status(portfolioRequest.getStatus())
                    .format(Format.SERVICE)
                    .fileUrl(piece.getFileUrl())
                    .build();
        }
        portfolioRepository.save(portfolio);

        ArrayList<String> fileUrls = new ArrayList<>();
        // PortfolioPiece에 저장
        for (PieceInfo pieceInfo: portfolioRequest.getPieces()) {
            PortfolioPiece portfolioPiece = new PortfolioPiece();
            if (pieceInfo.getPieceId() == null) {
                // 사용자가 작품 선택을 하지 않고 파일을 업로드했다면, S3에 저장하고 그 url을 저장

                String fileUrl = "";
                try {
                    fileUrl = s3UploadService.saveFile(pieceInfo.getPieceUploaded());
                    fileUrls.add(fileUrl);
                }  catch (IOException e) {
                    e.fillInStackTrace();
                }

                portfolioPiece = PortfolioPiece.builder()
                        .portfolio(portfolio)
                        .title(pieceInfo.getTitle())
                        .program(pieceInfo.getProgram())
                        .contribution(pieceInfo.getContribution())
                        .content(pieceInfo.getContent())
                        .fileUrl(fileUrl)
                        .build();
            } else {
                // 작품을 선택했다면
                Piece piece = pieceRepository.findById(pieceInfo.getPieceId())
                        .orElseThrow(() -> new IllegalArgumentException("해당 작품이 없습니다."));

                fileUrls.add(piece.getFileUrl());

                portfolioPiece = PortfolioPiece.builder()
                        .portfolio(portfolio)
                        .piece(piece)
                        .title(pieceInfo.getTitle())
                        .program(pieceInfo.getProgram())
                        .contribution(pieceInfo.getContribution())
                        .content(pieceInfo.getContent())
                        .build();
            }

            portfolioPieceRepository.save(portfolioPiece);
        }

        // 위의 로직에 따르면, fileUrl이 null일 수 있음.
        if (portfolio.getFileUrl() == null) {
            portfolio.setFileUrl(fileUrls.get(0));
            portfolioRepository.save(portfolio);
        }

        return portfolio.getPofolId();

    }


    public Long addPortfolioMyFormat(Long userId, PortfolioRequestMyFormat portfolioRequest) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 없습니다."));

        List<String> fileUrls = new ArrayList<>();
        for (MultipartFile fileUrl : portfolioRequest.getFileUrl()) {
            try {
                String fileName = s3UploadService.saveFile(fileUrl);
                fileUrls.add(fileName);
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
