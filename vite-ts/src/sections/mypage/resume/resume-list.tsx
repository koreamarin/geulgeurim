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
        "essay": `국가는 법률이 정하는 바에 의하여 재외국민을 보호할 의무를 진다. 국회의원은 국가이익을 우선하여 양심에 따라 직무를 행한다. 국회는 정부의 동의없이 정부가 제출한 지출예산 각항의 금액을 증가하거나 새 비목을 설치할 수 없다. 교육의 자주성·전문성·정치적 중립성 및 대학의 자율성은 법률이 정하는 바에 의하여 보장된다.

        모든 국민은 양심의 자유를 가진다. 다만. 이에 의하여 민사상이나 형사상의 책임이 면제되지는 아니한다. 재판관은 대통령이 임명한다.

        근로자는 근로조건의 향상을 위하여 자주적인 단결권·단체교섭권 및 단체행동권을 가진다. 국가는 과학기술의 혁신과 정보 및 인력의 개발을 통하여 국민경제의 발전에 노력하여야 한다. 동일한 범죄에 대하여 거듭 처벌받지 아니한다, 원장은 국회의 동의를 얻어 대통령이 임명하고.

        국가는 지역간의 균형있는 발전을 위하여 지역경제를 육성할 의무를 진다. 명령·규칙 또는 처분이 헌법이나 법률에 위반되는 여부가 재판의 전제가 된 경우에는 대법원은 이를 최종적으로 심사할 권한을 가진다. 국군은 국가의 안전보장과 국토방위의 신성한 의무를 수행함을 사명으로 하며. 제한하는 경우에도 자유와 권리의 본질적인 내용을 침해할 수 없다.

        한 회계연도를 넘어 계속하여 지출할 필요가 있을 때에는 정부는 연한을 정하여 계속비로서 국회의 의결을 얻어야 한다. 국가는 건전한 소비행위를 계도하고 생산품의 품질향상을 촉구하기 위한 소비자보호운동을 법률이 정하는 바에 의하여 보장한다. 선거운동은 각급 선거관리위원회의 관리하에 법률이 정하는 범위안에서 하되. 농지의 소작제도는 금지된다.

        법관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니하며. 중임할 수 없다. 가부동수인 때에는 부결된 것으로 본다. 정당한 보상을 지급하여야 한다.

        모든 국민은 법률이 정하는 바에 의하여 공무담임권을 가진다. 국무위원은 국무총리의 제청으로 대통령이 임명한다, 국회는 국무총리 또는 국무위원의 해임을 대통령에게 건의할 수 있다. 그 임기는 4년으로 하며.

        국가는 재해를 예방하고 그 위험으로부터 국민을 보호하기 위하여 노력하여야 한다, 강화조약. 대통령이 임시회의 집회를 요구할 때에는 기간과 집회요구의 이유를 명시하여야 한다, 그 내용과 한계는 법률로 정한다.

        현행범인인 경우와 장기 3년 이상의 형에 해당하는 죄를 범하고 도피 또는 증거인멸의 염려가 있을 때에는 사후에 영장을 청구할 수 있다. 대법관은 대법원장의 제청으로 국회의 동의를 얻어 대통령이 임명한다, 그 내용과 한계는 법률로 정한다. 직전대통령이 없을 때에는 대통령이 지명한다.

        정당의 목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에 그 해산을 제소할 수 있고, 국회는 헌법 또는 법률에 특별한 규정이 없는 한 재적의원 과반수의 출석과 출석의원 과반수의 찬성으로 의결한다, 헌법재판소 재판관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니한다, 시장의 지배와 경제력의 남용을 방지하며.`,
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

