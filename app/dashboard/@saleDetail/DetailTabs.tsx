import { FC } from 'react';
import { Tab, Tabs } from '@mui/material';
import { DASHBOARD_DETAIL_TABS } from '../constants';

interface Props {
  tabValue: number;
  onChangeTab: (event: any, newValue: number) => void;
}

const DetailTabs: FC<Props> = ({ onChangeTab, tabValue }) => {
  return (
    <Tabs
      sx={{ mt: 2, borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      value={tabValue}
      indicatorColor="primary"
      onChange={onChangeTab}
    >
      {DASHBOARD_DETAIL_TABS.map((tab, index) => {
        return (
          <Tab
            disableRipple
            sx={{
              transition: 'all .3s',
              fontSize: 16,
              '&:hover': {
                bgcolor: (theme) => theme.palette.action.selected,
              },
              '&.Mui-selected': {
                fontWeight: 800,
              },
            }}
            label={tab}
            key={tab}
            {...a11yProps(index)}
          />
        );
      })}
    </Tabs>
  );
};

export default DetailTabs;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
