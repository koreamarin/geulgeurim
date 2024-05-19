package com.geulgrim.common.piece.domain;

import com.geulgrim.common.piece.domain.entity.Piece;
import com.geulgrim.common.piece.domain.entity.enums.PieceType;
import com.geulgrim.common.piece.domain.repository.PieceRepository;

import java.util.List;

public enum PieceSearchType {

    NAME{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, PieceType type, String keyword){
            if(type==PieceType.NONE || type == null){
                return pieceRepository.findByOwnerIdAndNameContainingOrderByUpdatedAt(userId, keyword);
            }else{
                return pieceRepository.findByOwnerIdAndTypeAndNameContainingOrderByUpdatedAt(userId, type, keyword);
            }
        }
    },
    DESCRIPTION{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, PieceType type, String keyword){
            if(type==PieceType.NONE || type == null){
                return pieceRepository.findByOwnerIdAndDescriptionContainingOrderByUpdatedAt(userId, keyword);
            }else{
                return pieceRepository.findByOwnerIdAndTypeAndDescriptionContainingOrderByUpdatedAt(userId, type, keyword);
            }
        }
    },
    BOTH{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, PieceType type, String keyword){
            if(type==PieceType.NONE || type == null){
                return pieceRepository.findByOwnerIdAndNameContainingOrDescriptionContainingOrderByUpdatedAt(userId, keyword, keyword);
            }else{
                return pieceRepository.findByOwnerIdAndTypeAndNameContainingOrDescriptionContainingOrderByUpdatedAt(userId, type, keyword, keyword);
            }
        }
    };

    public abstract List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, PieceType type, String keyword);
}
