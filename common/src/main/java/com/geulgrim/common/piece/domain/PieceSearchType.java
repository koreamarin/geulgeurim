package com.geulgrim.common.piece.domain;

import com.geulgrim.common.piece.domain.entity.Piece;
import com.geulgrim.common.piece.domain.repository.PieceRepository;

import java.util.List;

public enum PieceSearchType {

    NAME{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, String keyword){
            return pieceRepository.findByOwnerIdAndNameContainingOrderByUpdatedAt(userId, keyword);
        }
    },
    DESCRIPTION{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, String keyword){
            return pieceRepository.findByOwnerIdAndDescriptionContainingOrderByUpdatedAt(userId, keyword);
        }
    },
    BOTH{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, String keyword){
            return pieceRepository.findByOwnerIdAndNameContainingOrDescriptionContainingOrderByUpdatedAt(userId, keyword, keyword);
        }
    }
    ;

    public abstract List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, String keyword);

}
