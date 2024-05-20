package com.geulgrim.market.market.application;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.geulgrim.market.commonserver.piece.application.response.PieceResponseDto;
import com.geulgrim.market.commonserver.piece.presentation.PieceFeignClient;
import com.geulgrim.market.global.s3.S3UploadService;
import com.geulgrim.market.market.application.dto.request.MarketCreateRequestDto;
import com.geulgrim.market.market.application.dto.request.MarketUpdateRequestDto;
import com.geulgrim.market.market.application.dto.response.ETHResponseDto;
import com.geulgrim.market.market.application.dto.response.MarketDetailResponseDto;
import com.geulgrim.market.market.application.dto.response.MarketResponseDto;
import com.geulgrim.market.market.domain.ETHinfo.ETHInfo;
import com.geulgrim.market.market.domain.Market;
import com.geulgrim.market.market.domain.MarketLog;
import com.geulgrim.market.market.domain.SearchAndOrderType;
import com.geulgrim.market.market.domain.SearchType;
import com.geulgrim.market.market.domain.repository.MarketRepository;
import com.geulgrim.market.market.exception.GetApiFailedException;
import com.geulgrim.market.market.exception.JsonProcessingFailedException;
import com.geulgrim.market.market.exception.NoMarketExistException;
import com.geulgrim.market.market.exception.NotSupportSuchTypeException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MarketService {

    private final MarketRepository marketRepository;

    private final S3UploadService s3UploadService;

    private final PieceFeignClient pieceFeignClient;

    public Long create(MultipartFile image, MarketCreateRequestDto dto) throws IOException {
        Market market = dto.toEntity();
        if (image != null && !image.isEmpty()) {
            uploadImage(market, image);
        }
        marketRepository.save(market);
        return market.getId();
    }

    public List<MarketResponseDto> searchAndOrderMarkets(String type, String keyword, boolean isOrderViewCount) {

        List<Market> markets = null;
        log.info("type ={}", type);
        log.info("keyword ={}", keyword);

        if (type != null && keyword != null) {
            try {
                //조회수 정렬 체크 된 경우
                if (isOrderViewCount) {
                    SearchAndOrderType searchAndOrderType = SearchAndOrderType.valueOf(type);
                    markets = searchAndOrderType.getListBySearchTypeAndOrder(marketRepository, keyword);

                } else { //조회수 체크 되지 않은 경우
                    SearchType searchType = SearchType.valueOf(type);
                    markets = searchType.getListBySearchType(marketRepository, keyword);

                }
            } catch (IllegalArgumentException e) {
                throw new NotSupportSuchTypeException();
            }
        } else {
            if (isOrderViewCount) {
                markets = marketRepository.findAllByOrderByViewCountDesc();
            } else {
                markets = marketRepository.findAll();
            }
        }
        return markets.stream().map(MarketResponseDto::from).toList();
    }

    public MarketDetailResponseDto detail(Long id) {
        Market market = marketRepository.findById(id).orElseThrow(NoMarketExistException::new);
        PieceResponseDto pieceResponse = pieceFeignClient.findPieceByIdFromCommon(market.getPiece());
        return MarketDetailResponseDto.from(market, pieceResponse);
    }

//    로그인 유저의 판매 게시글 조회, 이후 요청 시 넘어오는 로그인 유저 정보 활용
//    public List<MarketResponseDto> findAllByUserId(Long userId) {
//        User user = userFeignClient.findById(userId);
//        List<Market> markets = marketRepository.findAllBySellerId(user.getId());
//        return markets.stream()
//                .map(MarketResponseDto::from)
//                .toList();
//    }

    public MarketResponseDto update(Long id, MultipartFile image, MarketUpdateRequestDto dto) throws IOException {
//        checkIsWriter(dto.getId()); //로그인한 유저가 작성자인지 확인 필요
        Market market = marketRepository.findById(id).orElseThrow(NoMarketExistException::new);
        if (image != null && !image.isEmpty()) {
            uploadImage(market, image);
        }
        market.updateMarket(dto);
        return MarketResponseDto.from(market);
    }

    public ETHResponseDto getETHinfo() {
        HttpResponse<String> response;
        HttpRequest request = HttpRequest.newBuilder().uri(URI.create("https://api.bithumb.com/public/ticker/ETH_KRW")).header("accept", "application/json").method("GET", HttpRequest.BodyPublishers.noBody()).build();
        try {
            response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            log.info("api 호출 결과 ={}", response.body());

        } catch (IOException | InterruptedException e) {
            throw new GetApiFailedException();
        }

        try {
            ObjectMapper mapper = new ObjectMapper();
            ETHInfo ethInfo = mapper.readValue(response.body(), ETHInfo.class);
            log.info("생성된 ethinfo 시가 ={}", ethInfo.getData().getOpening_price());
            return ETHResponseDto.builder().openingPrice(ethInfo.getData().getOpening_price()).minPrice(ethInfo.getData().getMin_price()).build();

        } catch (JsonProcessingException e) {
            e.printStackTrace();
            throw new JsonProcessingFailedException();
        }
    }

    public Market findById(Long id) {
        return marketRepository.findById(id).orElseThrow(NoMarketExistException::new);
    }

    public PieceResponseDto findPieceFromCommonServer(Long pieceId) {
        return pieceFeignClient.findPieceByIdFromCommon(pieceId);
    }

    public List<MarketLog> findMarketLogByPieceId(Long pieceId) {
        return marketRepository.findMarketLogsByPieceId(pieceId);
    }


    public void uploadImage(Market market, MultipartFile image) throws IOException {
        String s3Url = s3UploadService.saveFile(image);
        market.uploadThumbnail(s3Url);
    }

}
