import { UserOutlined } from '@ant-design/icons';
import { Input, Modal, Select, Typography } from 'antd'
import React, { useState } from 'react'

const { Title } = Typography;
const { Option } = Select;
function AddCourseModal(props) {
    const { visible, handleOk, confirmLoading, onCancel } = props;
    const [courseStatus, setCourseStatus] = useState(null);
    const courseNameRef = React.useRef();
    const courseDescriptionRef = React.useRef();
    const onOk = () => {
        const courseName = courseNameRef.current.input.value;
        const courseDescription = courseDescriptionRef.current.input.value;
        handleOk({ courseName, courseDescription, courseStatus });
        courseNameRef.current.input.value = null;
        courseDescriptionRef.current.input.value = null;
        setCourseStatus(null);
    }
    return (
        <div>
            <Modal
                title="ADD COURSE"
                visible={visible}
                onOk={onOk}
                okText="CREATE"
                confirmLoading={confirmLoading}
                onCancel={onCancel}
                destroyOnClose
            >
                <Title level={5}>Course Name</Title>
                <Input ref={courseNameRef} type="text" size="large" placeholder="Course Name" prefix={<UserOutlined />} />
                <br /><br />

                <Title level={5}>Course Description</Title>
                <Input ref={courseDescriptionRef} type="text" size="large" placeholder="Course Description" prefix={<UserOutlined />} />
                <br /><br />
                <Title level={5}>Course Status</Title>
                <Select onSelect={val => setCourseStatus(val)} style={{ width: 120 }} >
                    <Option value="active">Active</Option>
                    <Option value="non-active">Non-Active</Option>
                </Select>
            </Modal>
        </div>
    )
}

export default AddCourseModal