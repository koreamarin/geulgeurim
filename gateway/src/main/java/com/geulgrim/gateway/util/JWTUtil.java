package com.geulgrim.gateway.util;

import com.geulgrim.gateway.dto.UserInfoResponseDto;
import com.geulgrim.gateway.exception.UnAuthorizedException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Map;

@Component
@Slf4j
public class JWTUtil {

    @Value("${spring.jwt.salt}")
    private String salt;

    public UserInfoResponseDto getUserInfo(String token) {
        Jws<Claims> claims = null;
        try {
            claims = Jwts.parser()
                    .verifyWith(this.getSigningKey())
                    .build()
                    .parseSignedClaims(token);
        } catch (Exception e){
            throw new UnAuthorizedException();
        }
        Map<String, Object> value = claims.getPayload();

        return UserInfoResponseDto.builder()
                .userId((Integer) value.get("userId"))
                .userType((String) value.get("userType"))
                .build();
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(this.salt);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
