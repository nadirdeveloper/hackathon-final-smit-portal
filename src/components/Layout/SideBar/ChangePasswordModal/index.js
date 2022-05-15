import { UserOutlined } from '@ant-design/icons';
import { Input, Modal, Typography } from 'antd'
import React, { useState } from 'react'

const { Title } = Typography;
function ChangePasswordModal(props) {
    const { visible, handleOk, confirmLoading, onCancel } = props;
    const oldPasswordRef = React.useRef();
    const newPasswordRef = React.useRef();
    const onOk = () => {
        const oldPassword = oldPasswordRef.current.input.value;
        const newPassword = newPasswordRef.current.input.value;
        handleOk({
            oldPassword,
            newPassword
        });
    }
    return (
        <div>
            <Modal
                title="Change Password"
                visible={visible}
                onOk={onOk}
                okText="UPDATE"
                confirmLoading={confirmLoading}
                onCancel={onCancel}
                destroyOnClose
            >
                <Title level={5}>Old Password</Title>
                <Input ref={oldPasswordRef} type="text" size="large" placeholder="Old Password" prefix={<UserOutlined />} />
                <br /><br />

                <Title level={5}>New Password</Title>
                <Input ref={newPasswordRef} type="text" size="large" placeholder="New Password" prefix={<UserOutlined />} />
                <br /><br />
            </Modal>
        </div>
    )
}

export default ChangePasswordModal