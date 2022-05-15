import React from 'react'
import DashboardCard from '../../../components/DashboardCard';
import Chart from 'react-google-charts';
import { UserOutlined, ScheduleOutlined, BookOutlined, CalendarOutlined, BarsOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Card } from 'antd';
export default function AllCards({ data, styles }) {
    console.log(data)
    const allCards = [
        {
            title: "TOTAL ADMINS",
            icon: <UserOutlined className={styles.cardIcon} />,
            value: data?.totalAdminsCount
        },
        {
            title: "TOTAL ACTIVE COURSES",
            icon: <BookOutlined className={styles.cardIcon} />,
            value: data?.totalActiveCoursesCount
        },
        {
            title: "PENDING LEAVE REQUESTS",
            icon: <ScheduleOutlined className={styles.cardIcon} />,
            value: data?.totalPendingLeaveReqCount
        },
        {
            title: "TOTAL STUDENTS",
            icon: <UsergroupAddOutlined className={styles.cardIcon} />,
            value: data?.totalStudentsCount
        },
        {
            title: "ALL NON-ACTIVE Courses",
            icon: <BarsOutlined className={styles.cardIcon} />,
            value: data?.totalInActiveCoursesCount
        },
        {
            title: "TOTAL BATCHES Students",
            icon: <BarsOutlined className={styles.cardIcon} />,
            value: data?.totalBatchesCount
        },
    ]
    return (
        <div className={styles.cardGrid}>
            {
                allCards.map((data) => (
                    <DashboardCard styles={styles} data={data} />
                ))
            }
            <Card
                className={styles.cardContainerChart}
                style={{ height: "100%" }}
            >
                <Chart
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={[["User", "Count"], ["Total Admins", data?.totalAdminsCount], ["Total Students", data?.totalStudentsCount]]}
                    options={{
                        // Material design options
                        chart: {
                            title: 'USERS',
                        },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '2' }}
                />
            </Card>
            <Card
                className={styles.cardContainerChart}
                style={{ height: "100%" }}
            >
                <Chart
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[["Course", "Count"], ["Active Course", data?.totalActiveCoursesCount], ["NON-ACTIVE Course", data?.totalInActiveCoursesCount]]}
                    options={{
                        // Material design options
                        chart: {
                            title: 'Courses',
                        },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '2' }}
                />
            </Card>
            <Card
                className={styles.cardContainerChart}
                style={{ height: "100%" }}
            >
                <Chart
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[["Requests", "Count"], ["Pending Leaves", data?.totalPendingLeaveReqCount], ["Total Batches", data?.totalBatchesCount]]}
                    options={{
                        // Material design options
                        chart: {
                            title: 'INFO',
                        },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '2' }}
                />
            </Card>
        </div>
    )
}