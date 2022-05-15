import { UserOutlined } from '@ant-design/icons';
import { Input, Modal, Select, Typography } from 'antd'
import React, { useState } from 'react'

const { Title } = Typography;
const { Option } = Select;
function AddAllLeaveRequestsModal(props) {
    const { visible, handleOk, confirmLoading, onCancel } = props;
    const [courseStatus, setCourseStatus] = useState(null);
    const subjectRef = React.useRef();
    const descrptionRef = React.useRef();
    const onOk = () => {
        const subject = subjectRef.current.input.value;
        const description = descrptionRef.current.input.value;
        handleOk({ subject, description });
    }
    return (
        <div>
            <Modal
                title="ADD Leave Request"
                visible={visible}
                onOk={onOk}
                okText="CREATE"
                confirmLoading={confirmLoading}
                onCancel={onCancel}
                destroyOnClose
            >
                <Title level={5}>Subject</Title>
                <Input ref={subjectRef} type="text" size="large" placeholder="Subject" prefix={<UserOutlined />} />
                <br /><br />

                <Title level={5}>Description</Title>
                <Input ref={descrptionRef} type="text" size="large" placeholder="Description" prefix={<UserOutlined />} />
                <br /><br />
            </Modal>
        </div>
    )
}

export default AddAllLeaveRequestsModal