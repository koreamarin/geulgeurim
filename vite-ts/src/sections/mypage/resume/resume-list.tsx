import { useRef, useState, useCallback } from 'react';

import ResumeListCard from './resume-list-card';

  // interface ExpandMoreProps extends IconButtonProps {
  //   expand: boolean;
  // }

  // const ExpandMore = styled((props: ExpandMoreProps) => {
  //   const { expand, ...other } = props;
  //   return <IconButton {...other} />;
  // })(({ theme, expand }) => ({
  //   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  //   marginLeft: 'auto',
  //   transition: theme.transitions.create('transform', {
  //     duration: theme.transitions.duration.shortest,
  //   }),
  // }));


// ----------------------------------------------------------------------

const dummy = {
  "getResumesResponse": [
      {
        "resumeId": 41,
        "resumeTitle": "이력서",
        "essay": "저는 월급 루팡입니다.",
        "openStatus": "PRIVATE",
        "fileUrl": "https://k.kakaocdn.net/dn/cD4BaL/btsAaYmkBz8/2YJ6o7gqIk52caVsddDW10/img_110x110.jpg",
        "getResumePositionResponses": [
          {
              "resumePositionId": 69,
              "positionId": 1
          },
          {
              "resumePositionId": 70,
              "positionId": 2
          },
          {
              "resumePositionId": 71,
              "positionId": 1
          },
          {
              "resumePositionId": 74,
              "positionId": 3
          }
        ]
      },
      {
        "resumeId": 42,
        "resumeTitle": "이력서",
        "essay": `"잠재력이 있는 산업군에서의 덕업일치"

        잠재력이 큰 시장에서 변화를 주도하는 회사, 즐기며 좋아하는 분야의 회사에서 일하고 싶습니다. 웹툰은 학창시절부터 빠지지 않는 존재였는데, 특히 이말년시리즈같은 개그물을 주로 봤습니다. 야후에서 연재되던 이말년시리즈가 네이버에서 연재되어 좋아하는 만화를 보기 위해 네이버 웹툰을 보기 시작한 뒤부터 지금까지 매일 웹툰을 보고 있습니다. 좋아하기도 하지만, 새로운 컨텐츠가 끊임없이 생기고 여러 기술을 적용할 수 있는 웹툰 시장의 장래성 또한 끌렸습니다. 웹툰은 게임, 영화, 드라마 등 다른 컨텐츠로 파생되기도 하고, VR을 비롯한 다양한 신기술을 적용할 수 있습니다. 그리고 한국뿐만 아니라 해외 시장을 개척할 잠재력 또한 큽니다. 네이버 웹툰은 독자의 편의성을 고려해 오전 12시에 제공되던 웹툰을 오후 11시에 제공하는 등 필요한 서비스를 제공하며, 새로운 컨텐츠를 바탕으로 해외 웹툰 시장을 개척하고 있습니다. 1위의 자리를 유지하고 있지만 끊임없이 개선점을 찾는 네이버 웹툰에 이끌렸으며, 웹툰 시장의 파이를 키우고 싶습니다.`,
        "openStatus": "PRIVATE",
        "fileUrl": "",
        "getResumePositionResponses": [
          {
              "resumePositionId": 75,
              "positionId": 1
          },
          {
              "resumePositionId": 76,
              "positionId": 2
          }
        ]
      }
  ]
}

const WORKS_SORT_OPTIONS = [
  { value: 'latest', label: '최신 순' },
  { value: 'popular', label: '조회수 순' },
  { value: 'oldest', label: '과거 순' },
];

const WORKS_SEARCH_OPTIONS = [
  { value: 'content&title', label: '제목+내용' },
  { value: 'content', label: '내용' },
  { value: 'title', label: '제목' },
];


export default function ResumeList() {
    // const [expanded, setExpanded] = useState(false);

    // const handleExpandClick = () => {
    //   setExpanded(!expanded);
    // };

    return (
      dummy.getResumesResponse.map((item, index) => {
        const positionList: number[] = item.getResumePositionResponses.map((positionItem) => positionItem.positionId)
        return <ResumeListCard key={index} resumeId={item.resumeId} resumeTitle={item.resumeTitle} essay={item.essay}
        openStatus={item.openStatus} fileUrl={item.fileUrl} position={positionList} />
      })
    );
  }

