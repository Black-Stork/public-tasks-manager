import  React from 'react';
import { Modal, Button, Form, Input, Switch  } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

import { updateTask, createTask } from 'task-actions';


class TaskEditModalFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            title: props.create ? 'Create' : 'Update',
            item: props.item,
            create: props.create
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.item !== prevState.item) {
            this.setState({
                item: this.props.item
            });
            if(this.props.item) {
                this.props.form.setFieldsValue({
                    title: this.props.item.title,
                    description: this.props.item.description,
                    status: this.props.item.status
                });
            }
        }
    }

    sendRequst = () => {
        const { form, dispatch, create } = this.props;
        const { item } = this.state;
        if(!form || !item) {
            return;
        }

        const title = form.getFieldValue('title');
        if(!title) {
            return this.props.onOk('Please, fill in the Title field');
        }
        const description = form.getFieldValue('description');
        if(!description) {
            return this.props.onOk('Please, fill in the Description field');
        }
        const status = form.getFieldValue('status');

        this.setState({
            loading: true
        });

        if(create) {
            dispatch(createTask({
                title,
                description,
                status
            }, (err) => {
                this.setState({
                    loading: false
                });
                if(err) {
                    return this.props.onOk('An error occurred..');
                } else {
                    this.props.onOk();
                }
            }))
        } else {
            dispatch(updateTask({
                id: item['_id'],
                title,
                description,
                status
            }, (err) => {
                this.setState({
                    loading: false
                });
                if(err) {
                    return this.props.onOk('An error occurred..');
                } else {
                    this.props.onOk();
                }
            }))
        }
    };

    render() {
        const { title, loading, item } = this.state;
        const { onOk, onCancel} = this.props;
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        };

        return (
            <Modal
                visible={Boolean(item)}
                title={title}
                onOk={onOk}
                onCancel={onCancel}
                footer={[
                    <Button key="back" onClick={onCancel}>Return</Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={this.sendRequst}>
                        Submit
                    </Button>,
                ]}
            >
                <Form onSubmit={this.sendRequst} className="login-form">
                    <FormItem
                        {...formItemLayout}
                        label="Title"
                    >
                    {
                        getFieldDecorator('title', {
                            rules: [{
                                required: true, 
                                message: 'Please input your E-mail!',
                            }],
                        })(<Input placeholder="Title" />)
                    }
                    </FormItem>
        
                    <FormItem
                        {...formItemLayout}
                        label="Description"
                    >
                    {
                        getFieldDecorator('description', {
                            rules: [{
                                required: true, 
                                message: 'Please input your Description!',
                            }],
                        })(<TextArea placeholder="Description" autosize={{ minRows: 2, maxRows: 6 }} />)
                    }
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="Completed"
                    >
                    {
                        getFieldDecorator('status', { valuePropName: 'checked' })(
                            <Switch />
                        )
                    }
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const TaskEditModalComponent = Form.create()(TaskEditModalFormComponent);

export default TaskEditModalComponent;