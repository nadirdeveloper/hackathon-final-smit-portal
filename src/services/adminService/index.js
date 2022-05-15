import { firebase } from "../../config/firebase"
import { setAllCoursesData, setAllCoursesLoading } from "../../redux/slices/admin/allCoursesSlice";
import { setDashboardData, setDashboardLoading } from "../../redux/slices/admin/dashboardSlice"

const { collection, query, where, db, getDocs, addDoc } = firebase.firestore;

const getDashboardData = async (dispatch) => {
    const getAdminsQuery = query(collection(db, "users"), where("role", "==", "admin"));
    const getCoursesQuery = query(collection(db, "courses"), where("courseStatus", "==", "active"));
    const getLeaveReqQuery = query(collection(db, "leaveRequests"), where("status", "==", "pending"));
    const getTotalStudentsQuery = query(collection(db, "users"), where("role", "==", "student"));
    const getInActiveCourseQuery = query(collection(db, "courses"), where("courseStatus", "==", "non-active"));
    const getTotalBatchesQuery = query(collection(db, "studentBatchData"));

    const totalAdminsCount = (await getDocs(getAdminsQuery))?.size;
    const totalActiveCoursesCount = (await getDocs(getCoursesQuery))?.size;
    const totalPendingLeaveReqCount = (await getDocs(getLeaveReqQuery))?.size;
    const totalStudentsCount = (await getDocs(getTotalStudentsQuery))?.size;
    const totalInActiveCoursesCount = (await getDocs(getInActiveCourseQuery))?.size;
    const totalBatchesCount = (await getDocs(getTotalBatchesQuery))?.size;

    const data = {
        totalAdminsCount,
        totalActiveCoursesCount,
        totalPendingLeaveReqCount,
        totalStudentsCount,
        totalInActiveCoursesCount,
        totalBatchesCount,
    }
    dispatch(setDashboardData(data))
    dispatch(setDashboardLoading(false))
}

const getAllCourses = async (dispatch) => {
    const getCoursesQuery = query(collection(db, "courses"));
    const docSnaps = await getDocs(getCoursesQuery);
    const courses = docSnaps.docs.map((doc) => {
        return {
            ...doc.data(),
            id: doc.id
        }
    });
    dispatch(setAllCoursesData(courses));
    dispatch(setAllCoursesLoading(false));
    return courses
}

const addCourse = async (course, userId) => {
    const newCourse = {
        ...course,
        createdBy: userId,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
    }
    const docRef = await addDoc(collection(db, "courses"), newCourse);
    return docRef.id;
}

const deleteCourse = async (courseId) =>{
    const docRef = firebase.firestore.doc(firebase.firestore.db, 'courses', courseId);
    const deleteCourse = await firebase.firestore.deleteDoc(docRef);
    return deleteCourse;
}

export const adminService = {
    getDashboardData,
    getAllCourses,
    addCourse,
    deleteCourse,
}