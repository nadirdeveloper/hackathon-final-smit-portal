import React, { useEffect } from 'react'
import styles from './Dashboard.module.css';
import { Spin, Typography } from 'antd';
import AllCards from './AllCards'
import { useDispatch, useSelector } from 'react-redux';
import { adminService } from '../../../services/adminService';
const {Title} = Typography
function Dashboard() {
    const {data, loading} = useSelector(state => state.dashboard);
    const dispatch = useDispatch();
    useEffect(()=>{
        fetchDashboardData()
    },[]);
    const fetchDashboardData = () => {
        adminService.getDashboardData(dispatch);
    }
    return (
        <div>
            <Title className={styles.mainHeading} level={2}>DASHBOARD</Title>
            {
                loading ? (
                    <div className={styles.spinContainer}>
                        <Spin />
                    </div>
                ) : (
                    <AllCards styles={styles} data={data} />
                )
            }

        </div>
    )
}

export default Dashboard