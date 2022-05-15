import { UserOutlined } from '@ant-design/icons';
import { Input, Modal, Select, Typography } from 'antd'
import React, { useState } from 'react'

const { Title } = Typography;
const { Option } = Select;
function AddAdminsModal(props) {
    const { visible, handleOk, confirmLoading, onCancel } = props;
    const [courseStatus, setCourseStatus] = useState(null);
    const adminNameRef = React.useRef();
    const adminEmailRef = React.useRef();
    const adminPasswordRef = React.useRef();
    const onOk = () => {
        const adminName = adminNameRef.current.input.value;
        const adminEamil = adminEmailRef.current.input.value;
        const adminPassword = adminPasswordRef.current.input.value;
        handleOk({ name: adminName, email: adminEamil, password: adminPassword });
    }
    return (
        <div>
            <Modal
                title="ADD ADMIN"
                visible={visible}
                onOk={onOk}
                okText="CREATE"
                confirmLoading={confirmLoading}
                onCancel={onCancel}
                destroyOnClose
            >
                <Title level={5}>Admin Name</Title>
                <Input ref={adminNameRef} type="text" size="large" placeholder="Admin Name" prefix={<UserOutlined />} />
                <br /><br />

                <Title level={5}>Admin Email</Title>
                <Input ref={adminEmailRef} type="text" size="large" placeholder="Admin Email" prefix={<UserOutlined />} />
                <br /><br />
                <Title level={5}>Admin Password</Title>
                <Input ref={adminPasswordRef} type="text" size="large" placeholder="Admin Password" prefix={<UserOutlined />} />
                <br /><br />
            </Modal>
        </div>
    )
}

export default AddAdminsModal