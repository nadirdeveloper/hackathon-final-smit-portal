import React from 'react'
import { Layout, Menu, Dropdown, notification } from 'antd';
import {
    DashboardOutlined,
    CloseOutlined,
    MenuOutlined,
    UsergroupAddOutlined,
    ScheduleOutlined,
    LogoutOutlined,
    UserOutlined,
    BookOutlined,
    BarsOutlined,
} from '@ant-design/icons';
import logo from '../../../assets/images/logo.png';
import logoMini from '../../../assets/images/logo-mini.png'
import avatarImage from '../../../assets/images/avatar.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import { useDispatch } from 'react-redux';
import ChangePasswordModal from './ChangePasswordModal';
import { firebase } from '../../../config/firebase';
const { Header, Sider, Content } = Layout;


const LogoutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        const response = await authService.logout(dispatch);
        navigate("/admin/login");
    }
    return (
        <Menu.Item onClick={handleLogout} className="menu-nav-item" key="2"> <LogoutOutlined /> Logout</Menu.Item>
    )
}

class SideNav extends React.Component {
    state = {
        collapsed: false,
        visibleChangePassword: false
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    getSelectedKey() {
        if (window.location.pathname === "/admin/dashboard") {
            return '1'
        } else if (window.location.pathname === "/admin/allAdmins") {
            return '2'
        } else if (window.location.pathname === "/admin/allCourses") {
            return '3'
        } else if (window.location.pathname === "/admin/allLeaveRequest") {
            return '4'
        } else {
            return '1'
        }
    }
    handChangePassword = (data) => {
        const user = firebase.auth.currentUser;
        const newPassword = data?.newPassword;
        const credential = firebase.EmailAuthProvider.credential(
            user.email,
            data.oldPassword
        );
        firebase.reauthenticateWithCredential(user, credential).then(() => {
            // User re-authenticated.
            firebase.updatePassword(user, newPassword).then(() => {
                // Update successful.
                notification.success({
                    message: "Successfully Changed Password"
                });
                this.setState({ visibleChangePassword: false })
            }).catch((error) => {
                if (error) {
                    notification.error({
                        message: "Something Went Wrong on Updating Password"
                    })
                }
            });
        }).catch((error) => {
            // An error ocurred
            // ...
            notification.error({
                message: "Sorry, Wrong Password"
            })
        });

    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item className="menu-nav-item" key="1"> <UserOutlined /> Profile</Menu.Item>
                <Menu.Item onClick={() => this.setState({ visibleChangePassword: true })} className="menu-nav-item" key="3"> <UserOutlined /> Change Password</Menu.Item>
                <Menu.Divider />
                <LogoutBtn />
            </Menu>
        );
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="dashboard-logo">
                        <img src={!this.state.collapsed ? logo : logoMini} alt="logo" height="45" />
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.getSelectedKey()]}>
                        <Menu.Item key="1" icon={<DashboardOutlined />}>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<UsergroupAddOutlined />}>
                            <Link to="/admin/allAdmins"> All Admins </Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<BookOutlined />}>
                            <Link to="/admin/allCourses"> All Courses </Link>
                        </Menu.Item>
                        <Menu.Item key="4" icon={<ScheduleOutlined />}>
                            <Link to="/admin/allLeaveRequests"> All Leave Requests </Link>
                        </Menu.Item>
                        <Menu.Item key="5" icon={<BarsOutlined />}>
                            <Link to="/admin/allBatches"> Add Batch Students </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background-dashboard" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuOutlined : CloseOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        <div className="right-nav-items">
                            <Dropdown overlayClassName="menu-nav-items" overlay={menu} trigger={['click']}>
                                <a href="#test" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <img src={avatarImage} alt="profileImg" className="nav-profile-img" height="50" />
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content
                        className="site-layout-background-dashboard"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
                <ChangePasswordModal
                    visible={this.state.visibleChangePassword}
                    onCancel={() => this.setState({ visibleChangePassword: false })}
                    handleOk={this.handChangePassword}
                />
            </Layout>
        );
    }
}

export default SideNav;