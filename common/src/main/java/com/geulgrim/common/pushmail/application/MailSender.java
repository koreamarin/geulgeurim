package com.geulgrim.common.pushmail.application;

import com.geulgrim.common.pushmail.domain.PushMail;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import java.io.UnsupportedEncodingException;
import java.util.Date;

@RequiredArgsConstructor
public class MailSender {

    private static final String TEAM_GEULGRIM_MAIL = "teamgeulgrim@gmail.com";
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
            //전송 시각
            mimeMessageHelper.setSentDate(new Date(String.valueOf(pushMail.getCreatedAt())));

            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return true;
    }
}
