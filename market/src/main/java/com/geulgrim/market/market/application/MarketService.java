package com.geulgrim.market.market.application;

import com.geulgrim.market.commonserver.piece.presentation.PieceFeignClient;
import com.geulgrim.market.global.s3.S3UploadService;
import com.geulgrim.market.market.application.dto.request.MarketCreateRequestDto;
import com.geulgrim.market.market.application.dto.request.MarketUpdateRequestDto;
import com.geulgrim.market.market.application.dto.request.ThumbnailUploadDto;
import com.geulgrim.market.market.application.dto.response.MarketResponseDto;
import com.geulgrim.market.market.domain.Market;
import com.geulgrim.market.market.domain.repository.MarketRepository;
import com.geulgrim.market.market.exception.NoMarketExistException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@Transactional
@RequiredArgsConstructor
public class MarketService {

    private final MarketRepository marketRepository;

    private final S3UploadService s3UploadService;

    private final PieceFeignClient pieceFeignClient;

    public Long create(MarketCreateRequestDto dto) {
        Market market = dto.toEntity();
        marketRepository.save(market);
        return market.getId();
    }

    public MarketResponseDto upload(MultipartFile file, ThumbnailUploadDto dto) throws IOException {
        String s3Url = s3UploadService.saveFile(file);
        Market market = marketRepository.findById(dto.getId()).orElseThrow(NoMarketExistException::new);
        market.uploadThumbnail(s3Url);

        return MarketResponseDto.from(market);
    }

//    public List<MarketResponseDto> findAllByUserId(Long userId) {
//        User user = userFeignClient.findById(userId); //
//        List<Market> markets = marketRepository.findAllBySellerId(user.getId());
//        return markets.stream()
//                .map(MarketResponseDto::from)
//                .toList();
//    }

    public Market findById (Long id) {
        return marketRepository.findById(id).orElseThrow(NoMarketExistException::new);
    }

    public Market update (MarketUpdateRequestDto dto) {
//        checkIsWriter(dto.getId()); //로그인한 유저가 작성자인지 확인
        Market market = dto.toEntity(dto.getId());
        return marketRepository.save(market);
    }

}
