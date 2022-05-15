import { UserOutlined } from '@ant-design/icons';
import { Input, Modal, Select, Typography } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const { Title } = Typography;
const { Option } = Select;
function AddEnrollModal(props) {
    const { visible, handleOk,selectedCourse, confirmLoading, onCancel } = props;
    
    const emailRef = React.useRef();
    const lastQualificationRef = React.useRef();
    const fullNameRef = React.useRef();
    const phoneNoRef = React.useRef();
    const cnicRef = React.useRef();

    const onOk = () => {
       const email = emailRef.current.input.value
       const lastQualification = lastQualificationRef.current.input.value
       const fullName = fullNameRef.current.input.value
       const phoneNo = phoneNoRef.current.input.value
       const cnic = cnicRef.current.input.value
        handleOk({ 
            email,
            lastQualification,
            fullName,
            phoneNo,
            cnic
         });
    }
    const {user, currentUserData} = useSelector(state => state.user)
    return (
        <div>
            <Modal
                title="Enroll Course"
                visible={visible}
                onOk={onOk}
                okText="CREATE"
                confirmLoading={confirmLoading}
                onCancel={onCancel}
                destroyOnClose
            >
                <Title level={5}>Selected Course</Title>
                <Input value={selectedCourse?.courseName} type="text" disabled={true} size="large" placeholder="Course Name" prefix={<UserOutlined />} />
                
                <Title level={5}>Email</Title>
                <Input defaultValue={user?.email} ref={emailRef} type="text" size="large" placeholder="Email" prefix={<UserOutlined />} />

                <Title level={5}>Last Qualification</Title>
                <Input ref={lastQualificationRef} type="text" size="large" placeholder="Last Qualification" prefix={<UserOutlined />} />
                <br /><br />

                <Title level={5}>Full Name</Title>
                <Input ref={fullNameRef} type="text" size="large" placeholder="Full Name" prefix={<UserOutlined />} />

                <Title level={5}>Phone No</Title>
                <Input ref={phoneNoRef} type="text" size="large" placeholder="Phone No" prefix={<UserOutlined />} />


                <Title level={5}>CNIC</Title>
                <Input ref={cnicRef} type="text" size="large" placeholder="CNIC" prefix={<UserOutlined />} />
                <br /><br />
            </Modal>
        </div>
    )
}

export default AddEnrollModal