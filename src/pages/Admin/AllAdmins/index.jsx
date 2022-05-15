import { UserAddOutlined } from '@ant-design/icons';
import { Button, notification, Typography } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { firebase } from '../../../config/firebase';
import { adminService } from '../../../services/adminService';
import AddAdminsModal from './AddAdminsModal';
import styles from './AllAdmins.module.css';
import AllAdminsTable from './AllAdminsTable';

const { Title } = Typography;
function AllAdmins() {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const handleAddAdmins = async (data) => {
        axios.post("https://smit-portal-app.herokuapp.com/admin/addAdmin", data).then((response)=>{
            if(response.data.success){
                notification.success({
                    message: "Success",
                    description: "Admin added successfully"
                })
                getAllAdmins()
                setVisible(false);
            }else{
                notification.error({
                    message: "Error",
                    description:"Error in adding admin"
                })
            }
        }).catch((err)=>{
            if(err){
                notification.error({
                    message:"Error",
                    description:"Error in adding admin"
                })
            }
        })
    }
    useEffect(() => {
        getAllAdmins();
    }, []);

    const getAllAdmins = async () => {
        const { query, db, collection, getDocs, where } = firebase.firestore;
        const adminUerssQiery = query(collection(db, 'users'), where('role', '==', 'admin'));
        const adminSnaps = await getDocs(adminUerssQiery);
        const allAdmins = adminSnaps.docs.map(snap =>{
            return {
                ...snap.data(),
                id: snap.id
            }
        });
        setData(allAdmins);
        setLoading(false);
    }
    console.log(loading)
    return (
        <div>
            <Title className={styles.mainHeading} level={2}>ALL ADMINS</Title>
            <div className={styles.usersActions}>
                <Button
                    type="primary"
                    onClick={() => setVisible(true)}
                    icon={<UserAddOutlined />}
                    size="small"
                    style={{ width: 140, height: 40 }}
                >
                    Add Admins
                </Button>
            </div>
            <AddAdminsModal
                visible={visible}
                onCancel={() => setVisible(false)}
                handleOk={(data) => handleAddAdmins(data)}
            />
            <AllAdminsTable loading={loading} data={data} />
        </div >
    )
}

export default AllAdmins