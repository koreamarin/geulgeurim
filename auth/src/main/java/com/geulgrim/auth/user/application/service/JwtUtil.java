package com.geulgrim.auth.user.application.service;

import com.geulgrim.auth.user.application.dto.response.GeneratedJWT;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtUtil {

    private final SecretKey secretKey;

    public JwtUtil(@Value("${spring.jwt.secret}") String secretKey) {
        this.secretKey =  Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }

    public GeneratedJWT generateToken(Long userId, String email, String userType){
        String accessToken = generateAccessToken(userId, email, userType);
        String refreshToken = generateRefreshToken(userId, email, userType);

        // RefreshToken 저장 -> 저장위치 어디?

        return new GeneratedJWT(accessToken, refreshToken);
    }


    public String generateAccessToken(Long userId, String email, String userType){
        long tokenPeriod = 1000L * 60L * 60L; // 1시간

        Claims claims = Jwts.claims()
                .subject(email)
                .add("userId", userId)
                .add("userType", userType)
                .build();

        Date now = new Date();

        return Jwts.builder()
                .claims(claims)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + tokenPeriod))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }


    public String generateRefreshToken(Long userId, String email, String userType){
        long refreshPeriod = 1000L * 60L * 60L * 24 * 7; // 7일

        Claims claims = Jwts.claims()
                .subject(email)
                .add("userId", userId)
                .add("userType", userType)
                .build();

        Date now = new Date();

        return Jwts.builder()
                .claims(claims)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + refreshPeriod))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }


    public boolean verifyToken(String token){
        try {
            Jws<Claims> claims = Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token);
            return claims.getPayload()
                    .getExpiration()
                    .after(new Date());
        } catch (Exception e) {
            return false;
        }
    }

    public Claims parseClaims(String token){
        try {
            return Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseUnsecuredClaims(token).getPayload();
        }catch (ExpiredJwtException e){
            return e.getClaims();
        }
    }
}
