package com.geulgrim.auth.security.jwt;


import com.geulgrim.auth.user.domain.entity.Enums.UserType;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.Key;
import java.util.Date;
import java.util.Map;

@Component
@Slf4j
public class JWTUtil {

    @Value("${spring.jwt.salt}")
    private String salt;

    @Value("${spring.jwt.expiretime.access-token}")
    private long accessTokenExpireTime;

    @Value("${spring.jwt.expiretime.refresh-token}")
    private long refreshTokenExpireTime;

    public String createAccessToken(Long userId, UserType userType) {
        return create(userId, userType,"access-token", accessTokenExpireTime);
    }

    //	AccessToken에 비해 유효기간을 길게 설정.
    public String createRefreshToken(Long userId, UserType userType) {
        return create(userId, userType, "refresh-token", refreshTokenExpireTime);
    }

//    	Token 발급
//		key : Claim에 셋팅될 key 값
//		value : Claim에 셋팅 될 data 값
//		subject : payload에 sub의 value로 들어갈 subject값
//		expire : 토큰 유효기간 설정을 위한 값
//		jwt 토큰의 구성 : header + payload + signature
    private String create(Long userId, UserType userType, String subject, long expireTime) {
//		Payload 설정 : 생성일 (IssuedAt), 유효기간 (Expiration),
//		토큰 제목 (Subject), 데이터 (Claim) 등 정보 세팅.
        Claims claims = Jwts.claims()
                .subject(subject)
                .add("userId", userId)
                .add("userType", userType)
                .build();

        Date now = new Date();

        String jwt = Jwts.builder()
                .claims(claims)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expireTime))
                .signWith(this.getSigningKey()) // Signature 설정 : secret key를 활용한 암호화.
                .compact();

        return jwt;
    }

    //	Signature 설정에 들어갈 key 생성.
    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(this.salt);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}