import { UserAddOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminService } from '../../../services/adminService';
import AddCourseModal from './AddCourseModal';
import styles from './AllCourses.module.css';
import AllCourseTable from './AllCoursesTable';

const { Title } = Typography;
function AllCourses() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.allCourses);
  const { user } = useSelector(state => state.user);
  const [visible, setVisible] = React.useState(false);
  const handleAddCourse = async (data) => {
   const response = await adminService.addCourse(data, user.uid);
   adminService.getAllCourses(dispatch);
    setVisible(false);
  }
  return (
    <div>
      <Title className={styles.mainHeading} level={2}>ALL COURSES</Title>
      <div className={styles.usersActions}>
        <Button
          type="primary"
          onClick={() => setVisible(true)}
          icon={<UserAddOutlined />}
          size="small"
          style={{ width: 140, height: 40 }}
        >
          Add Course
        </Button>
      </div>
      <AddCourseModal
        visible={visible}
        onCancel={() => setVisible(false)}
        handleOk={(data) => handleAddCourse(data)}
      />
      <AllCourseTable loading={loading} data={data} />
    </div >
  )
}

export default AllCourses