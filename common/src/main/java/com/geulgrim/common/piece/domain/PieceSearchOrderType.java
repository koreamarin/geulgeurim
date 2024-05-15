package com.geulgrim.common.piece.domain;

import com.geulgrim.common.piece.domain.entity.Piece;
import com.geulgrim.common.piece.domain.repository.PieceRepository;

import java.util.List;

public enum PieceSearchOrderType {
    NAME{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, String keyword){
            return pieceRepository.findByOwnerIdAndNameContainingOrderByUpdatedAtDesc(userId, keyword);
        }
    },
    DESCRIPTION{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, String keyword){
            return pieceRepository.findByOwnerIdAndDescriptionContainingOrderByUpdatedAtDesc(userId, keyword);
        }
    },
    BOTH{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, String keyword){
            return pieceRepository.findByOwnerIdAndNameContainingOrDescriptionContainingOrderByUpdatedAtDesc(userId, keyword, keyword);
        }
    }
    ;

    public abstract List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, String keyword);

}
