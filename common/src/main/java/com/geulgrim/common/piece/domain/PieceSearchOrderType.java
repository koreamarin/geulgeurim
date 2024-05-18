package com.geulgrim.common.piece.domain;

import com.geulgrim.common.piece.domain.entity.Piece;
import com.geulgrim.common.piece.domain.repository.PieceRepository;

import java.util.List;

public enum PieceSearchOrderType {
    NAME{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, String keyword, String type){
            if(type == "" || type == null){
                return pieceRepository.findByOwnerIdAndNameContainingOrderByUpdatedAtDesc(userId, keyword);
            }else{
                return pieceRepository.findByOwnerIdAndTypeAndNameContainingOrderByUpdatedAtDesc(userId, keyword, type);
            }
        }
    },
    DESCRIPTION{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, String keyword, String type){
            if(type == "" || type == null){
                return pieceRepository.findByOwnerIdAndDescriptionContainingOrderByUpdatedAtDesc(userId, keyword);
            }else {
                return pieceRepository.findByOwnerIdAndTypeAndDescriptionContainingOrderByUpdatedAtDesc(userId, keyword, type);
            }

        }
    },
    BOTH{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, String keyword, String type){
            if(type == "" || type == null){
                return pieceRepository.findByOwnerIdAndNameContainingOrDescriptionContainingOrderByUpdatedAtDesc(userId, keyword, keyword);
            }else{
                return pieceRepository.findByOwnerIdAndTypeAndNameContainingOrDescriptionContainingOrderByUpdatedAtDesc(userId, keyword, keyword, type);
            }
        }
    }
    ;

    public abstract List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, String keyword, String type);

}
