import { UserAddOutlined } from '@ant-design/icons';
import { Button, notification, Typography } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { firebase } from '../../../config/firebase';
import AddAllLeaveRequestsModal from './AddAllLeaveRequestsModal';
import styles from './AllLeaveRequests.module.css';
import AllLeaveRequestsTable from './AllAllLeaveRequestsTable';
import Topbar from '../../../components/Layout/Topbar';
import { useSelector } from 'react-redux';

const { Title } = Typography;
function AllLeaveRequests() {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const { user } = useSelector(state => state.user);
    const handleAddRequest = async (data) => {
        const newRequest = {
            ...data,
            userId: user.uid,
            studentEmail: user.email,
            status: "pending",
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
        }
        const docRef = await firebase.firestore.addDoc(firebase.firestore.collection(firebase.firestore.db, "leaveRequests"), newRequest);
        if (docRef) {
            notification.success({
                message: "Success",
                description: "Request added successfully"
            })
            getAllLeaveRequests()
            setVisible(false);
        }
    }
    useEffect(() => {
        getAllLeaveRequests();
    }, []);

    const getAllLeaveRequests = async () => {
        const { query, db, collection, getDocs, where } = firebase.firestore;
        const leaveReqQuery = query(collection(db, 'leaveRequests'), where('userId', '==', user.uid));
        const adminSnaps = await getDocs(leaveReqQuery);
        const AllLeaveRequests = adminSnaps.docs.map(snap => {
            return {
                ...snap.data(),
                id: snap.id
            }
        });
        setData(AllLeaveRequests);
        setLoading(false);
    }
    console.log(loading)
    return (
        <Topbar>
            <Title className={styles.mainHeading} level={2}>All Leave Request</Title>
            <div className={styles.usersActions}>
                <Button
                    type="primary"
                    onClick={() => setVisible(true)}
                    icon={<UserAddOutlined />}
                    size="small"
                    style={{ width: 160, height: 40 }}
                >
                    Add Leave Request
                </Button>
            </div>
            <AddAllLeaveRequestsModal
                visible={visible}
                onCancel={() => setVisible(false)}
                handleOk={(data) => handleAddRequest(data)}
            />
            <AllLeaveRequestsTable loading={loading} data={data} />
        </Topbar>
    )
}

export default AllLeaveRequests