import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd'
import styles from './style.less'
import { registe } from '@/api/user'

class LoginForm extends Component {
  handleSubmit = async e => {
    const { history } = this.props
    e.preventDefault();
    let result = await registe()
    console.log(result.data.status)
    if (result.data.status === '0') {
      history.push('/management')
    }
  }

  render() {
    const { form: { getFieldDecorator } } = this.props
    return (
      <div className={styles['login-wrapper']}>
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(<Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} size='large' placeholder='Username' />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(
              <Input
                prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='password'
                size='large'
                placeholder='Password'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone!' }]
            })(
              <Input
                prefix={<Icon type='phone' style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="number"
                size='large'
                placeholder='phone'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }]
            })(
              <Input
                prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />}
                type='email'
                size='large'
                placeholder='email'
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' size='large' className='login-form-button'>
              注 册
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default withRouter(Form.create()(LoginForm))