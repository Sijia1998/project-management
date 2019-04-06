import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd'
import styles from './style.less'

class Login extends Component {
  handleSubmit = e => {
    const { form: { getFieldsValue, validateFields, getFieldDecorator }, history } = this.props
    e.preventDefault()
    validateFields((err, values) => {
      if (!err) {
        if (values.userName == 'admin' && values.password == '123456') {
          history.push('/management')
        } else {

        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles['login-wrapper']}>
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(<Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(
              <Input
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='password'
                placeholder='Password'
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default withRouter(Form.create()(Login))
