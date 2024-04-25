package com.geulgrim.auth.user.presentation;

import com.geulgrim.auth.user.application.UserService;
import com.geulgrim.auth.user.application.dto.LoginRequestDto;
import com.geulgrim.auth.user.application.dto.SignUpRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/login")
    public String login() {return "login/login";}

    @PostMapping("/login")
    public ResponseEntity<Long> login(@RequestBody LoginRequestDto dto) throws Exception{
        return new ResponseEntity<>(userService.login(), HttpStatus.OK);
    }

    @PostMapping("signup")
    public ResponseEntity<Boolean> signup(@RequestBody SignUpRequestDto dto) throws Exception{
        return new ResponseEntity<>(userService.signUp(dto), HttpStatus.CREATED);
    }
}
