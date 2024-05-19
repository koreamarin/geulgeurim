package com.geulgrim.common.push.infrastructure.fcm.util;

import com.geulgrim.common.push.application.dto.request.FCMDto;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class WebSender {

    public void sendWebPush(FCMDto dto) {

        Notification notification = Notification.builder()
                .setTitle(dto.getTitle())
                .setBody(dto.getContent())
                .build();

        Message message = Message.builder()
                .setToken(dto.getFcmToken())
                .setNotification(notification)
                .build();


        log.info("Sending web push message = {}", dto.getFcmToken());
        FirebaseMessaging.getInstance().sendAsync(message);


    }




}
