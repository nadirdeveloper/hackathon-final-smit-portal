import React from 'react'
import { Layout, Form, Input, Button, Typography, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../../../assets/images/logo.png';
import logoBlack from '../../../assets/images/logo-black.png';
import { authService } from '../../../services/authService';
import { Link, useNavigate } from 'react-router-dom';
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function Login() {
    const navigate = useNavigate();
    const loginAuth = async ({ email, password }) => {
        const response = await authService.login(email, password)
        if (!response.success) {
            return notification.error({ message: response.message })
        }
        notification.success({ message: response.message })
        console.log(response.userData)
        if (response.userData.role === 'admin') {
            return navigate('/admin/dashboard')
        }
        if (response.userData.role === 'student') {
            return navigate('/user/home')
        }

    }
    return (
        <Layout className="login-layout">
            <Header className="header-background" >
                <Link to="/">
                <div className="logo">
                    <img src={logo} alt="logo" height="50" />
                </div>

                </Link>
            </Header>
            <Content style={{ padding: '0 50px', }}>
                <div className="site-layout-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: false,
                        }}
                        onFinish={(data) => loginAuth(data)}
                    >
                        <div className="login-logo-container">
                            <img src={logoBlack} alt="logo" height="50" />
                        </div>
                        <div className='login-title-container'>
                            <h2>Student Login</h2>
                        </div>
                        <Title level={5}>Email</Title>
                        <Form.Item
                            name="email"
                            className="login-inputfield"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                        </Form.Item>
                        <Title level={5}>Password</Title>
                        <Form.Item
                            name="password"
                            className="login-inputfield"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <div className="login-form-btn-cont">
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                                <br/>
                                <span>OR</span>
                                <br/>
                                <Link to="/user/register">Register</Link>
                            </div>
                        </Form.Item>
                    </Form></div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Saylani ©2022 Created by Nadir Ali</Footer>
        </Layout>
    )
}

export default Login
