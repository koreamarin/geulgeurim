package com.geulgrim.common.push.infrastructure.mail.util;

import com.geulgrim.common.push.domain.Push;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;

@Component
@RequiredArgsConstructor
public class MailSender {

    private static String TEAM_GEULGRIM_MAIL = "teamgeulgrim@gmail.com";

    private final JavaMailSender javaMailSender;

    public void sendMailPush(Push push, String rcvEmail, String rcvNickname) {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            //title
            mimeMessageHelper.setSubject(push.getTitle());
            //content
            mimeMessageHelper.setText(push.getContent());
            //receiver
            mimeMessageHelper.setTo(new InternetAddress(rcvEmail, rcvNickname, "UTF-8"));
            //sender(teamgeulgrim)
            mimeMessageHelper.setFrom(TEAM_GEULGRIM_MAIL);

            javaMailSender.send(mimeMessage);

        } catch (MessagingException | UnsupportedEncodingException e) {
            e.printStackTrace();
        }

    }
}
