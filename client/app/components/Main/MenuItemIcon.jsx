import  React from 'react';
import { Icon } from 'antd';

const MenuItemIconComponent = ({menu, current}) => (<Icon type={menu === current ? 'star' : 'star-o'} />);

export default MenuItemIconComponent;