package com.geulgrim.common.push.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import static com.geulgrim.common.push.domain.PushFormat.*;

@Getter
@RequiredArgsConstructor
public enum PushDomain {

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

    FAVORITE_JOB_CLOSINGSOON("FAVORITE_JOB_CLOSINGSOON") {
        @Override
        public String generateTitle() {
            return FAVORITE_JOB_CLOSINGSOON_TITLE;
        }

        @Override
        public String generateContent() {
            return FAVORITE_JOB_CLOSINGSOON_CONTENT;
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
        return domain.equals(FAVORITE_JOB_CLOSINGSOON.toString());
    }
}
