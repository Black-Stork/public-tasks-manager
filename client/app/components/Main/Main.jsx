import  React from 'react';
import { connect } from 'react-redux';

import { Layout, Spin, Button, message } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

import Menu from 'Menu';
import Tasks from 'Tasks';

import TaskEditModalComponent from '../Tasks/TaskEditModal';

class Main extends React.Component {
    constructor(props) {
        super(props);

        const menuItems = [
            'In process',
            'Completed'
        ]

        this.state = {
            menuCollapsed: false,
            menuItems,
            menuCurrent: menuItems[0],
            creatingItem: null
        }
    }

    menuToggleCollapsed = () => {
        this.setState({
            menuCollapsed: !this.state.menuCollapsed
        });
    }

    handleMenuClick = (e) => {
        this.setState({
            menuCurrent: e.key
        });
    }

    handleTaskCreate = (evt) => {
        evt.preventDefault();

        this.setState({
            creatingItem: {
                title: '',
                description: '',
                status: false
            }
        });
    }

    handleTaskCreateOk = (err) => {
        if(err) {
            message.info(err);
        } else {
            message.info('Task created successfully');
            this.setState({
                creatingItem: null
            });
        }
    }

    handleTaskCreateCancel = () => {
        this.setState({
            creatingItem: null
        });
    }

    render() {
        const { menuCurrent, menuCollapsed, menuItems, creatingItem } = this.state;
        const { tasks, dispatch } = this.props;

        return (<Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        collapsible
                        collapsed={menuCollapsed}
                        onCollapse={this.menuToggleCollapsed}
                    >
                        <div className="logo" />
                        <Spin spinning={tasks.isLoading || tasks.error} >
                            <Menu 
                                items={menuItems} 
                                menuCurrent={menuCurrent}
                                onMenuClick={this.handleMenuClick}>
                            </Menu>
                            <div className="btn-create-container">
                                <Button 
                                    type="primary" 
                                    icon="plus-circle-o" 
                                    size='small'
                                    onClick={this.handleTaskCreate}>
                                    Create
                                </Button>
                            </div>
                        </Spin>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff' }}>
                            {menuCurrent}
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <TaskEditModalComponent 
                                dispatch={dispatch} 
                                item={creatingItem} 
                                create={true}
                                onOk={this.handleTaskCreateOk} 
                                onCancel={this.handleTaskCreateCancel} 
                            />
                            <Tasks status={menuCurrent.toLowerCase() === 'completed'} />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Public Tasks Manager © 2018 Created by <a href="https://github.com/Black-Stork/public-tasks-manager" target="_blank">Nikita Matusevich</a>
                        </Footer>
                    </Layout>
                </Layout>);
    }
};

export default connect(
  (state) => {
      return state;
  }
)(Main); 