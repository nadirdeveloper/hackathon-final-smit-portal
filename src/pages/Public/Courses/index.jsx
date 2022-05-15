import { Button, Card, notification, Spin } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Topbar from '../../../components/Layout/Topbar'
import { firebase } from '../../../config/firebase';
import { publicService } from '../../../services/publicService';
import AddEnrollModal from './AddEnrollModal';
import styles from './index.module.css';

function Courses() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState({});
    useEffect(() => {
        fetchCourses();
    }, [])
    const fetchCourses = () => {
        publicService.getAllCourses(dispatch);
    }
    const handleErollCourse = async (data) => {
        const EnrollRef = firebase.firestore.collection(firebase.firestore.db, 'enrollments');
        const addEnrollMents = await firebase.firestore.addDoc(EnrollRef, {
            ...data,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
        })
        notification.success({
            message: "Successfully Enrolled In Course"
        });
        setVisible(false);
        setSelectedCourse(false);
    }
    const { data, loading } = useSelector(state => state.courses);
    return (
        <>
            <Topbar>
                <div>
                    <h2 className='main-heading' >Courses</h2>
                    <div
                        style={{
                            display: 'flex',
                            // justifyContent: 'center',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        {loading ? (
                            <div>
                                <Spin />
                            </div>
                        ) : data.map(course => (
                            <Card style={{ width: 300, margin: "10px", ...(course.courseStatus === "non-active" ? { backgroundColor: "#ccc" } : {}) }}>
                                <div className={styles.courseCardInner}>
                                    <h2>{course.courseName}</h2>
                                    <h4>Status: {course.courseStatus === "non-active" ? "Admissions Closed" : "Open"}</h4>
                                </div>
                                <div className={styles.courseCardFooter}>
                                    <Button disabled={course.courseStatus === "non-active"} onClick={() => {
                                        setVisible(true)
                                        setSelectedCourse(course);
                                    }} type="primary">Enroll</Button>
                                </div>
                            </Card>
                        ))}

                    </div>
                </div>
                <AddEnrollModal
                    visible={visible}
                    onCancel={() => {
                        setVisible(false);
                        setSelectedCourse(false);
                    }}
                    handleOk={(data) => handleErollCourse(data)}
                    selectedCourse={selectedCourse}
                />
            </Topbar>
        </>
    )
}

export default Courses