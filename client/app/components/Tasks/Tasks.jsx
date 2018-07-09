import  React from 'react';
import { connect } from 'react-redux';

import { Spin, Icon, List, Button, message } from 'antd';

import TaskEditModalComponent from './TaskEditModal';

import { fetchTasks, fetchMoreTasks, deleteTask } from 'task-actions';

class Tasks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoadingMore: true,
            loadingMore: false,
            limit: 5,
            editingItem: null
        }
    }

    componentWillMount() {
        const { dispatch, status } = this.props;
        const { limit } = this.state;

        dispatch(fetchTasks(status, limit));
    }

    componentDidUpdate(prevProps) {
        if(this.props.status !== prevProps.status) {
            const { dispatch, status } = this.props;
            const { limit } = this.state;

            dispatch(fetchTasks(status, limit));
        }
    }

    handleLoadMore = () => {
        const { dispatch, tasks, status } = this.props;
        const { limit } = this.state;

        this.setState({
            loadingMore: true,
        });

        dispatch(fetchMoreTasks(status, tasks.data.length, limit, (err) => {
            if(err) {
                console.log(err);
            }
            this.setState({
                loadingMore: false
            }, () => {
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            })
        }))
    }

    handleTaskEdit = (task) => {
        if(!task) {
            return;
        }
        this.setState({
            editingItem: task
        });
    }

    handleTaskEditOk = (err) => {
        if(err) {
            message.info(err);
        } else {
            message.info('Task saved successfully');
            this.setState({
                editingItem: null
            });
        }
    }

    handleTaskEditCancel = () => {
        this.setState({
            editingItem: null
        });
    }

    handleTaskDelete = (task) => {
        if(!task) {
            return;
        }
        const { dispatch } = this.props;
        dispatch(deleteTask(task['_id']));
    }

    render() {
        const { tasks, dispatch } = this.props;
        const { loadingMore, editingItem } = this.state;

        const loadMore = (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
              {loadingMore && <Spin />}
              {!loadingMore && <Button onClick={this.handleLoadMore}>Loading more..</Button>}
            </div>
        );

        return (
            <div>
                <TaskEditModalComponent 
                    dispatch={dispatch} 
                    item={editingItem} 
                    onOk={this.handleTaskEditOk} 
                    onCancel={this.handleTaskEditCancel} 
                />
                <List
                    loading={tasks.isLoading || tasks.error}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={tasks.data}
                    renderItem={item => (
                        <List.Item actions={[
                            <a href="javascript:void(0)" onClick={(evt) => {evt.preventDefault(); this.handleTaskEdit(item)}}>edit</a>, 
                            <a href="javascript:void(0)" onClick={(evt) => {evt.preventDefault(); this.handleTaskDelete(item)}}>delete</a>
                        ]}>
                            <List.Item.Meta
                            avatar={<Icon type="check-circle-o" />}
                            title={<span>{item.title}</span>}
                            description={item.description}
                            />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
};

export default connect(
  (state) => {
      return state;
  }
)(Tasks); 