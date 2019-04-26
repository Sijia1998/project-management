import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd'
import styles from './style.less'
// import { login } from '@/api/user'
import { connect } from 'react-redux'
import { actionCreators } from './store'

class LoginForm extends Component {
  handleSubmit = async e => {
    const { history, handleLogin, userInfo } = this.props
    e.preventDefault();
    handleLogin()

  }

  componentWillReceiveProps(newProps) {
    const { history } = this.props
    if (newProps !== this.props) {
      console.log(newProps.userInfo)
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
            <Button type='primary' htmlType='submit' size='large' className='login-form-button'>
              登  录
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.login
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleLogin() {
      dispatch(actionCreators.saveUserInfo())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form.create()(LoginForm)))