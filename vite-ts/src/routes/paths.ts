import { paramCase } from 'src/utils/change-case';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
  RECRUIT: '/recruit',
  COMMUNITY: '/community',
  NFT: '/nft',
  MYPAGE: '/mypage',
  COMPANY: '/company'
};

// ----------------------------------------------------------------------

export const paths = {
  recruit: {
    main: `${ROOTS.RECRUIT}`,
    details: (id: number) => `${ROOTS.RECRUIT}/${id}`,
    apply: (id: number) => `${ROOTS.RECRUIT}/apply/${id}`,
    apply_fail: (id: number) => `${ROOTS.RECRUIT}/apply/${id}/fail`,
    apply_success: (id: number) => `${ROOTS.RECRUIT}/apply/${id}/success`,
  },

  community: {
    root: `${ROOTS.COMMUNITY}`,
    board: {
      main: `${ROOTS.COMMUNITY}/board`,
      detail: (id: number) => `${ROOTS.COMMUNITY}/board/${id}`,
      write: `${ROOTS.COMMUNITY}/board/write`,
    },
    share: {
      main: `${ROOTS.COMMUNITY}/share`,
      detail: (id: number) => `${ROOTS.COMMUNITY}/share/${id}`,
      write: `${ROOTS.COMMUNITY}/share/write`,
    },
    crew: {
      main: `${ROOTS.COMMUNITY}/crew`,
      detail: (id: number) => `${ROOTS.COMMUNITY}/crew/${id}`,
      write: `${ROOTS.COMMUNITY}/crew/write`,
      apply: (id: number) => `${ROOTS.COMMUNITY}/crew/apply/${id}`,
    },
  },

  nft: {
    root: `${ROOTS.NFT}`,
    detail: (id: number) => `${ROOTS.NFT}/${id}`,
  },

  mypage: {
    root: `${ROOTS.MYPAGE}`,
    apply: `${ROOTS.MYPAGE}/apply`,
    interest: `${ROOTS.MYPAGE}/interest`,
    crew: `${ROOTS.MYPAGE}/crew`,

    // 포트폴리오
    portfolio: `${ROOTS.MYPAGE}/portfolio`,
    portfolioDetail: (id:number) => `${ROOTS.MYPAGE}/portfolio/detail/${id}`,
    portfolioDetailUserFormat: (id:number) => `${ROOTS.MYPAGE}/portfolio/detail/user/${id}`,
    portfolioWrite: `${ROOTS.MYPAGE}/portfolio/write`,
    portfolioWriteUserFormat: `${ROOTS.MYPAGE}/portfolio/write/user`,
    portfolioEdit: (id:number) => `${ROOTS.MYPAGE}/portfolio/edit/${id}`,

    // 이력서
    resume: `${ROOTS.MYPAGE}/resume`,
    resumeWrite: `${ROOTS.MYPAGE}/resume/write`,
    resumeCopy: (id: number) => `${ROOTS.MYPAGE}/resume/write/${id}`,
    resumeDetail: (id: number) => `${ROOTS.MYPAGE}/resume/${id}`,
    resumeEdit: (id: number) => `${ROOTS.MYPAGE}/resume/${id}/edit`,

    // 내 작품
    works: `${ROOTS.MYPAGE}/works`,
    worksWrite: `${ROOTS.MYPAGE}/works/write`,
    worksDetail: (id: number) => `${ROOTS.MYPAGE}/works/${id}`,
    worksEdit: (id: number) => `${ROOTS.MYPAGE}/works/${id}/edit`,

    // 크루
    applyList: `${ROOTS.MYPAGE}/crew/applylist`,
  },

  company: {
    root: `${ROOTS.MYPAGE}/company`,
    introduction: `${ROOTS.MYPAGE}/company/introduction`,
    applicants: `${ROOTS.MYPAGE}/company/applicants`
  },

  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneUI: 'https://mui.com/store/items/zone-landing-page/',
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figma:
    'https://www.figma.com/file/hjxMnGUJCjY7pX8lQbS7kn/%5BPreview%5D-Minimal-Web.v5.4.0?type=design&node-id=0-1&mode=design&t=2fxnS70DuiTLGzND-0',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id: string) => `/product/${id}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  post: {
    root: `/post`,
    details: (title: string) => `/post/${paramCase(title)}`,
    demo: {
      details: `/post/${paramCase(MOCK_TITLE)}`,
    },
  },
  // AUTH
  auth: {
    amplify: {
      login: `${ROOTS.AUTH}/amplify/login`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      register: `${ROOTS.AUTH}/amplify/register`,
      newPassword: `${ROOTS.AUTH}/amplify/new-password`,
      forgotPassword: `${ROOTS.AUTH}/amplify/forgot-password`,
    },
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
    firebase: {
      login: `${ROOTS.AUTH}/firebase/login`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      register: `${ROOTS.AUTH}/firebase/register`,
      forgotPassword: `${ROOTS.AUTH}/firebase/forgot-password`,
    },
    auth0: {
      login: `${ROOTS.AUTH}/auth0/login`,
    },
    supabase: {
      login: `${ROOTS.AUTH}/supabase/login`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      register: `${ROOTS.AUTH}/supabase/register`,
      newPassword: `${ROOTS.AUTH}/supabase/new-password`,
      forgotPassword: `${ROOTS.AUTH}/supabase/forgot-password`,
    },
  },
  authDemo: {
    classic: {
      login: `${ROOTS.AUTH_DEMO}/classic/login`,
      register: `${ROOTS.AUTH_DEMO}/classic/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/classic/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/classic/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/classic/verify`,
    },
    modern: {
      login: `${ROOTS.AUTH_DEMO}/modern/login`,
      register: `${ROOTS.AUTH_DEMO}/modern/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    mail: `${ROOTS.DASHBOARD}/mail`,
    chat: `${ROOTS.DASHBOARD}/chat`,
    blank: `${ROOTS.DASHBOARD}/blank`,
    kanban: `${ROOTS.DASHBOARD}/kanban`,
    walktour: `${ROOTS.DASHBOARD}/walktour`,
    calendar: `${ROOTS.DASHBOARD}/calendar`,
    permission: `${ROOTS.DASHBOARD}/permission`,
    fileManager: `${ROOTS.DASHBOARD}/file-manager`,
    general: {
      app: `${ROOTS.DASHBOARD}/app`,
      ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
      analytics: `${ROOTS.DASHBOARD}/analytics`,
      banking: `${ROOTS.DASHBOARD}/banking`,
      booking: `${ROOTS.DASHBOARD}/booking`,
      file: `${ROOTS.DASHBOARD}/file`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      new: `${ROOTS.DASHBOARD}/product/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/product/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/product/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/product/${MOCK_ID}/edit`,
      },
    },
    invoice: {
      root: `${ROOTS.DASHBOARD}/invoice`,
      new: `${ROOTS.DASHBOARD}/invoice/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    },
    post: {
      root: `${ROOTS.DASHBOARD}/post`,
      new: `${ROOTS.DASHBOARD}/post/new`,
      details: (title: string) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}`,
      edit: (title: string) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}`,
        edit: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}/edit`,
      },
    },
    order: {
      root: `${ROOTS.DASHBOARD}/order`,
      details: (id: string) => `${ROOTS.DASHBOARD}/order/${id}`,
      demo: {
        details: `${ROOTS.DASHBOARD}/order/${MOCK_ID}`,
      },
    },
    job: {
      root: `${ROOTS.DASHBOARD}/job`,
      new: `${ROOTS.DASHBOARD}/job/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/job/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/job/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/job/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/job/${MOCK_ID}/edit`,
      },
    },
    tour: {
      root: `${ROOTS.DASHBOARD}/tour`,
      new: `${ROOTS.DASHBOARD}/tour/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/tour/${id}`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/tour/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}/edit`,
      },
    },
  },
};
