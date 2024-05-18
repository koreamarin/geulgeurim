package com.geulgrim.common.piece.domain;

import com.geulgrim.common.piece.domain.entity.Piece;
import com.geulgrim.common.piece.domain.entity.enums.PieceType;
import com.geulgrim.common.piece.domain.repository.PieceRepository;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
public enum PieceSearchOrderType {
    NAME{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, PieceType type, String keyword){
            if(type==PieceType.NONE || type == null){
                return pieceRepository.findByOwnerIdAndNameContainingOrderByUpdatedAtDesc(userId, keyword);
            }else{
                return pieceRepository.findByOwnerIdAndTypeAndNameContainingOrderByUpdatedAtDesc(userId, type, keyword);
            }
        }
    },
    DESCRIPTION{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, PieceType type, String keyword){
            if(type==PieceType.NONE  || type == null){
                return pieceRepository.findByOwnerIdAndDescriptionContainingOrderByUpdatedAtDesc(userId, keyword);
            }else {
                return pieceRepository.findByOwnerIdAndTypeAndDescriptionContainingOrderByUpdatedAtDesc(userId, type, keyword);
            }

        }
    },
    BOTH{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, PieceType type, String keyword){
            if(type==PieceType.NONE  || type == null){
                return pieceRepository.findByOwnerIdAndNameContainingOrDescriptionContainingOrderByUpdatedAtDesc(userId, keyword, keyword);
            }else{
                return pieceRepository.findByOwnerIdAndTypeAndNameContainingOrDescriptionContainingOrderByUpdatedAtDesc(userId, type, keyword, keyword);
            }
        }
    }
    ;

    public abstract List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, PieceType type, String keyword);

}
