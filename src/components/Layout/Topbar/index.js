import React from 'react'
import { Layout, Menu, Dropdown, Button } from 'antd';
import logo from '../../../assets/images/logo.png'
import avatarImage from '../../../assets/images/avatar.jpg'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../../../services/authService';
const { Header, Content } = Layout;

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUserData } = useSelector(state => state.user);
    const handleLogout = async () => {
        const response = await authService.logout(dispatch, currentUserData);
        if (response?.role === "admin") {
            navigate("/admin/login");
        } else {
            navigate("/user/login");
        }
    }
    return (
        <Menu.Item className="menu-nav-item" key="2" onClick={() => handleLogout()} > <LogoutOutlined /> Logout</Menu.Item>
    )
}

const RightComponent = () => {
    const { user, currentUserData } = useSelector(state => state.user);
    const navigate = useNavigate();
    const menu = (
        <Menu>
            <Menu.Item className="menu-nav-item" key="1"> <UserOutlined /> Profile</Menu.Item>
            <Menu.Divider />
            <LogoutBtn />
        </Menu>
    );
    return (
        <div className="right-nav-items">
            {
                user ? (
                    <Dropdown overlayClassName="menu-nav-items" overlay={menu} trigger={['click']}>
                        <a href="#test" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <img src={avatarImage} alt="profileImg" className="nav-profile-img" height="50" />
                        </a>
                    </Dropdown>
                ) : (
                    <div>
                        <Button type="primary" style={{ marginRight: "4px" }} className="login-btn" onClick={() => navigate("/user/login")}>Login</Button>
                        <Button type="primary" className="signup-btn" onClick={() => navigate("/user/register")}>Register</Button>
                    </div>
                )
            }

        </div>
    )
}

const MenuComponent = ({ getSelectedKey }) => {
    const { user, currentUserData } = useSelector(state => state.user);
    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[getSelectedKey()]}
            style={{ lineHeight: '64px', flex: 1, marginLeft: "10px" }}
        >
            <Menu.Item key="1">
                <Link to={user ? "/user/home" : "/"}>Home</Link>
            </Menu.Item>
            {
                user ? (
                    <Menu.Item key="2"><Link to="/user/leavingRequests">Leaving Requests</Link></Menu.Item>
                ):(
                    <Menu.Item key="2"><Link to="/courses">Courses</Link></Menu.Item>
                )
            }
        </Menu>
    )
}

class Topbar extends React.Component {
    state = {
    };

    getSelectedKey() {
        if (window.location.pathname === "/") {
            return '1'
        } else if (window.location.pathname === "/courses") {
            return '2'
        } else {
            return '1'
        }
    }
    render() {


        return (
            <Layout>
                <Header style={{ width: '100%', display: "flex" }}>
                    <div style={{ textAlign: "center" }}>
                        <Link to="/">
                        <img src={logo} className="logo" alt="logo" height="45" />
                        </Link>
                    </div>
                    <MenuComponent getSelectedKey={this.getSelectedKey} />
                    <RightComponent />
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
        );
    }
}

export default Topbar;