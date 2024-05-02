package com.geulgrim.market.market.application;

import com.geulgrim.market.commonserver.piece.presentation.PieceFeignClient;
import com.geulgrim.market.global.s3.S3UploadService;
import com.geulgrim.market.market.application.dto.request.MarketCreateRequestDto;
import com.geulgrim.market.market.application.dto.request.MarketUpdateRequestDto;
import com.geulgrim.market.market.application.dto.request.ThumbnailUploadDto;
import com.geulgrim.market.market.application.dto.response.MarketResponseDto;
import com.geulgrim.market.market.domain.Market;
import com.geulgrim.market.market.domain.MarketLog;
import com.geulgrim.market.market.domain.repository.MarketRepository;
import com.geulgrim.market.market.exception.NoMarketExistException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MarketService {

    private final MarketRepository marketRepository;

    private final S3UploadService s3UploadService;

    private final PieceFeignClient pieceFeignClient;

    public Long create(MultipartFile image, MarketCreateRequestDto dto) throws IOException {
        Market market = dto.toEntity();
        if(image != null && !image.isEmpty()) {
            uploadImage(market, image);
        }
        marketRepository.save(market);
        return market.getId();
    }

    public MarketResponseDto upload(MultipartFile image, ThumbnailUploadDto dto) throws IOException {
        Market market = marketRepository.findById(dto.getId()).orElseThrow(NoMarketExistException::new);
        uploadImage(market, image);
        return MarketResponseDto.from(market);
    }

//    로그인 유저의 판매 게시글 조회, 이후 요청 시 넘어오는 로그인 유저 정보 활용
//    public List<MarketResponseDto> findAllByUserId(Long userId) {
//        User user = userFeignClient.findById(userId);
//        List<Market> markets = marketRepository.findAllBySellerId(user.getId());
//        return markets.stream()
//                .map(MarketResponseDto::from)
//                .toList();
//    }

    public Market findById (Long id) {
        return marketRepository.findById(id).orElseThrow(NoMarketExistException::new);
    }

    public List<MarketLog> findMarketLogByPiece(){

    }

    public Market update (MultipartFile image, MarketUpdateRequestDto dto) throws IOException {
//        checkIsWriter(dto.getId()); //로그인한 유저가 작성자인지 확인
        Market market = marketRepository.findById(dto.getId()).orElseThrow(NoMarketExistException::new);
        if(image != null && !image.isEmpty()) {
            uploadImage(market, image);
        }
        return marketRepository.save(market);
    }

    public void uploadImage(Market market, MultipartFile image) throws IOException {
        String s3Url = s3UploadService.saveFile(image);
        market.uploadThumbnail(s3Url);
    }

}
