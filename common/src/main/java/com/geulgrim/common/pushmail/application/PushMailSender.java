package com.geulgrim.common.pushmail.application;

import com.geulgrim.common.pushmail.domain.PushMail;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
public class PushMailSender {

    private static String TEAM_GEULGRIM_MAIL = "teamgeulgrim@gmail.com";
    private final JavaMailSender javaMailSender;

    public boolean sendPushMail(PushMail pushMail, String rcvAddress, String rcvNickname) {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            //title
            mimeMessageHelper.setSubject(pushMail.getTitle());
            //content
            mimeMessageHelper.setText(pushMail.getContent());
            //receiver
            mimeMessageHelper.setTo(new InternetAddress(rcvAddress, rcvNickname, "UTF-8"));
            //sender(teamgeulgrim)
            mimeMessageHelper.setFrom(TEAM_GEULGRIM_MAIL);

            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return true;
    }
}
