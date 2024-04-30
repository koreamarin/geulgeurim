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

  job: icon('ic_job'),

  chat: icon('ic_chat'),
  mail: icon('ic_portfolio'),
  // -----------------------
  user: icon('ic_mywork'),
  blog: icon('ic_blog'),
  work: icon('ic_mywork'),

  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        items: [
          {
            title: t('내 정보'),
            path: paths.dashboard.root,
            icon: ICONS.info,
          },
          {
            title: t('내 작품'),
            path: paths.dashboard.general.ecommerce,
            icon: ICONS.mywork,
          },
          {
            title: t('이력서'),
            path: paths.dashboard.general.analytics,
            icon: ICONS.resume,
          },
          {
            title: t('포트폴리오'),
            path: paths.dashboard.general.banking,
            icon: ICONS.portfolio,
          },
          {
            title: t('관심있는 공고'),
            path: paths.dashboard.general.booking,
            icon: ICONS.interest,
          },
          {
            title: t('지원 내역'),
            path: paths.dashboard.general.file,
            icon: ICONS.apply,
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
