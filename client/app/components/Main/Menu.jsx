import  React from 'react';
import { Menu } from 'antd';

import MenuItemIconComponent from './MenuItemIcon';

const MenuComponent = ({items, menuCurrent, onMenuClick}) => {
    const renderItems = () => items.map((item) => {
        return (
            <Menu.Item key={item}>
                <MenuItemIconComponent menu={menuCurrent} current={item} />
                <span>{item}</span>
            </Menu.Item>
        );
    });

    return (
        <Menu 
            theme="dark" 
            mode="inline"
            onClick={onMenuClick}
            style={{maxHeight: window.innerHeight}}
            selectedKeys={[menuCurrent]}>
        
            {renderItems()}
        </Menu>
    );
};

export default MenuComponent;