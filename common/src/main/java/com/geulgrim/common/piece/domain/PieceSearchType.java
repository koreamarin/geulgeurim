package com.geulgrim.common.piece.domain;

import com.geulgrim.common.piece.domain.entity.Piece;
import com.geulgrim.common.piece.domain.repository.PieceRepository;

import java.util.List;

public enum PieceSearchType {

    NAME{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, String keyword, String type){
            if(type == "" || type == null){
                return pieceRepository.findByOwnerIdAndNameContainingOrderByUpdatedAt(userId, keyword);
            }else{
                return pieceRepository.findByOwnerIdAndTypeAndNameContainingOrderByUpdatedAt(userId, keyword, type);
            }
        }
    },
    DESCRIPTION{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, String keyword, String type){
            if(type == "" || type == null){
                return pieceRepository.findByOwnerIdAndDescriptionContainingOrderByUpdatedAt(userId, keyword);
            }else{
                return pieceRepository.findByOwnerIdAndTypeAndDescriptionContainingOrderByUpdatedAt(userId, keyword, type);
            }
        }
    },
    BOTH{
        @Override
        public List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, String keyword, String type){
            if(type == "" || type == null){
                return pieceRepository.findByOwnerIdAndNameContainingOrDescriptionContainingOrderByUpdatedAt(userId, keyword, keyword);
            }else{
                return pieceRepository.findByOwnerIdAndTypeAndNameContainingOrDescriptionContainingOrderByUpdatedAt(userId, keyword, keyword, type);
            }
        }
    };

    public abstract List<Piece> getListByPieceSearchType(PieceRepository pieceRepository, Long userId, String keyword, String type);
}
