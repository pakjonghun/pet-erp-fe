import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const NAV_WIDTH = 240;
export const NavMenus = {
  'back-data': {
    label: '백데이터',
    icon: <TextSnippetOutlinedIcon />,
  },
  stock: {
    label: '재고',
    icon: <Inventory2OutlinedIcon />,
  },
  sale: {
    label: '판매',
    icon: <ShoppingCartOutlinedIcon />,
  },
  setting: {
    label: '설정',
    icon: <SettingsOutlinedIcon />,
  },
};
