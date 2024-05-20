// ----------------------------------------------------------------------

export type IPostFilterValue = string;

export type IPostFilters = {
  publish: string;
};

// ----------------------------------------------------------------------

export type IPostHero = {
  title: string;
  coverUrl: string;
  createdAt?: Date;
  author?: {
    name: string;
    avatarUrl: string;
  };
};

export type IPostComment = {
  id: string;
  name: string;
  avatarUrl: string;
  message: string;
  postedAt: Date;
  users: {
    id: string;
    name: string;
    avatarUrl: string;
  }[];
  replyComment: {
    id: string;
    userId: string;
    message: string;
    postedAt: Date;
    tagUser?: string;
  }[];
};

export type IPostItem = {
  id: string;
  title: string;
  tags: string[];
  publish: string;
  content: string;
  coverUrl: string;
  metaTitle: string;
  totalViews: number;
  totalShares: number;
  description: string;
  totalComments: number;
  totalFavorites: number;
  metaKeywords: string[];
  metaDescription: string;
  comments: IPostComment[];
  createdAt: Date;
  favoritePerson: {
    name: string;
    avatarUrl: string;
  }[];
  author: {
    name: string;
    avatarUrl: string;
  };
};

export type BoardMainItem = {
  boardId: number;
  userId: number;
  userNickname: string;
  title: string;
  hit: number;
  commentCnt: number;
  createdAt: Date;
  updateAt: Date;
};

export type BoardItem = {
  boardId: number;
  user: {
    userId: number;
    email: string;
    birthday: Date;
    nickname: string;
    wallet: string;
    userType: string;
    createdAt: Date;
    name: string;
    phoneNum: string;
    fileUrl: string;
  }
  title: string;
  content: string;
  hit: number;
  commentList: [
    {
      boardCommentId: number;
      content: string;
    }
  ];
  imageList: [
    {
      boardImageId: number;
      imageType: string;
      fileUrl: string;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
};

export type ShareMainItem = {
  shareId: number;
  userId: number;
  userNickname: string;
  userProfile: string;
  imageList: 
    {
      shareImageId: number;
      fileUrl: string;
      imageType: string;
    }[]
  ;
  title: string;
  hit: string;
  commentCnt: string;
  createdAt: string;
  updatedAt: string;
};

export type ShareItem = {
  boardId: number;
  userId: number;
  userFileUrl: string;
  title: string;
  content: string;
  hit: number;
  commentList:
    {
      boardCommentId: number;
      content: string;
    }[];
  imageList: 
    {
      boardImageId: number;
      imageType: string;
      fileUrl: string;
    }[];
  createdAt: Date;
  updatedAt: Date;
};

export type CrewMainItem = {
  crewId: number;
  userId: number;
  userNickname: string;
  userFileUrl: string;
  projectName: string;
  imageList:
    {
      crewImageId: number;
      fileUrl: string;
    }[];
  pen: number;
  color: number;
  bg: number;
  pd: number;
  story: number;
  conti: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type communityMainItem = {
  popBoard: BoardMainItem[];
  newBoard: BoardMainItem[];
  newShare: ShareMainItem[];
  newCrew: CrewMainItem[];
}

export type MarketMainItem = {
  marketId: number;
  sellerId: number;
  pieceId: number;
  sellerNickname: string;
  sellerProfile: string;
  sellerThumbnail: string;
  marketThumbnail: string;
  title: string;
  price: number;
  hit: string;
  createdAt: string;

}


export type commentItem = {
  boardCommentId: number;
  userId: number;
  userNickname: string;
  userFileUrl: string;
  content: string;
  boardId: number;
  createdAt: Date;
  updatedAt: Date;
}