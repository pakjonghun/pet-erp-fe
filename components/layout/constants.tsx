import GridViewIcon from '@mui/icons-material/GridView';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const NAV_WIDTH = 240;
export const NavMenus = {
  dashboard: {
    label: '대시보드',
    icon: <GridViewIcon />,
  },
  'back-data': {
    label: '백데이터',
    icon: <TextSnippetOutlinedIcon />,
  },
  stock: {
    label: '재고',
    icon: <Inventory2OutlinedIcon />,
  },
};
