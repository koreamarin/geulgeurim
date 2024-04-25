package com.geulgrim.common.email.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import static com.geulgrim.common.email.domain.PushMailText.*;

@Getter
@RequiredArgsConstructor
public enum PushMailDomain {

    CREW_REQUEST("CREW_REQUEST") {
        @Override
        public String generateTitle() {
            return CREW_REQUEST_TITLE;
        }

        @Override
        public String generateContent() {
            return CREW_REQUEST_CONTENT;
        }
    },

    CREW_REQUEST_REPLY_OK("CREW_REQUEST_REPLY_OK") {
        @Override
        public String generateTitle() {
            return CREW_REQUEST_REPLY_OK_TITLE;
        }

        @Override
        public String generateContent() {
            return CREW_REQUEST_REPLY_OK_CONTENT;
        }
    },

    CREW_REQUEST_REPLY_DENY("CREW_REQUEST_REPLY_DENY") {
        @Override
        public String generateTitle() {
            return CREW_REQUEST_REPLY_DENY_TITLE;
        }

        @Override
        public String generateContent() {
            return CREW_REQUEST_REPLY_DENY_CONTENT;
        }

    },

    FAVORITE_JOB_UPLOAD("FAVORITE_JOB_UPLOAD") {
        @Override
        public String generateTitle() {
            return FAVORITE_JOB_UPLOAD_TITLE;
        }

        @Override
        public String generateContent() {
            return FAVORITE_JOB_UPLOAD_CONTENT;
        }
    },

    JOB_APPLY("JOB_APPLY") {
        @Override
        public String generateTitle() {
            return JOB_APPLY_TITLE;
        }

        @Override
        public String generateContent() {
            return JOB_APPLY_CONTENT;
        }
    },

    SOLD_PIECE("SOLD_PIECE") {
        @Override
        public String generateTitle() {
            return SOLD_PIECE_TITLE;
        }

        @Override
        public String generateContent() {
            return SOLD_PIECE_CONTENT;
        }
    };

    private final String domain;

    public abstract String generateTitle();

    public abstract String generateContent();

    public boolean isNeedNickName(){
        return domain.equals(CREW_REQUEST.toString()) || domain.equals(SOLD_PIECE.toString());
    }

    public boolean isNeedJobTitle() {
        return domain.equals(FAVORITE_JOB_UPLOAD.toString());
    }

}
