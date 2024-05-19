import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  info: icon('ic_user'),
  mywork: icon('ic_mywork'),
  resume: icon('ic_blog'),
  portfolio: icon('ic_portfolio'),
  interest: icon('ic_interest'),
  apply: icon('ic_apply'),
  crew: icon('ic_calendar'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const checkUser = localStorage.getItem('userType') === 'INDIVIDUAL'

  const data = useMemo(() => {
    if (checkUser) {
      return [
        {
          items: [
            {
              title: t('내 정보'),
              path: paths.mypage.root,
              icon: ICONS.info,
            },
            {
              title: t('내 작품'),
              path: paths.mypage.works,
              icon: ICONS.mywork,
            },
            {
              title: t('이력서'),
              path: paths.mypage.resume,
              icon: ICONS.resume,
            },
            {
              title: t('포트폴리오'),
              path: paths.mypage.portfolio,
              icon: ICONS.portfolio,
            },
            {
              title: t('크루 모집'),
              path: paths.mypage.crew,
              icon: ICONS.crew,
            },
            {
              title: t('관심있는 공고'),
              path: paths.mypage.interest,
              icon: ICONS.interest,
            },
            {
              title: t('지원 내역'),
              path: paths.mypage.apply,
              icon: ICONS.apply,
            }
          ],
        },
      ];
    } 
      return [
        {
          items: [
            {
              title: t('내 정보'),
              path: paths.company.root,
              icon: ICONS.info,
            },
            {
              title: t('기업 소개'),
              path: paths.company.introduction,
              icon: ICONS.resume,
            },
            {
              title: t('공고 내역'),
              path: paths.company.applicants,
              icon: ICONS.apply,
            }
          ],
        },
      ];
    
  }, [checkUser, t]);

  return data;
}