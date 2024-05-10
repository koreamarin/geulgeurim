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
  comment_cnt: number;
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
  thumbnail: string;
  title: string;
  hit: string;
  commentCnt: string;
  createdAt: string;
  updatedAt: string;
};

export type ShareItem = {
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

export type CrewMainItem = {
  crewId: number;
  userId: number;
  userNickname: string;
  userProfile: string;
  thumbnail: string;
  title: string;
  date: string;
  hit: string;
  commentCnt: string;
  pen: number;
  color: number;
  bg: number;
  pd: number;
  story: number;
  conti: number;
  status: number;
};

export type communityMainItem = {
  boardNew: BoardMainItem[];
  boardRecent: BoardMainItem[];
  shareRecent: ShareMainItem[];
  crewRecent: ShareMainItem[];
}