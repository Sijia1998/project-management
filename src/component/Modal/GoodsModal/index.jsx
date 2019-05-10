import React, { Component } from 'react'
import { Modal, Form, Input, Select } from 'antd';

const Option = Select.Option;

class ModelView extends Component {
  render() {
    const {
      visible, onCancel, onCreate, form, formValue
    } = this.props;
    const { getFieldDecorator } = form;
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
        visible={visible}
        title="Create a new collection"
        okText="修改"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Input></Input>
      </Modal>
    );
  }
}

export default Form.create()(ModelView)