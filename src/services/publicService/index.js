import { firebase } from "../../config/firebase";
import { setCoursesData, setCoursesLoading } from "../../redux/slices/public/coursesSlice";
const {query, db, collection, getDocs} = firebase.firestore
const getAllCourses = async (dispatch) =>{
    const getCoursesQuery = query(collection(db, "courses"));
    const docSnaps = await getDocs(getCoursesQuery);
    const courses = docSnaps.docs.map((doc) => {
        return {
            ...doc.data(),
            id: doc.id
        }
    });
    dispatch(setCoursesData(courses));
    dispatch(setCoursesLoading(false));
}

export const publicService = {
    getAllCourses,
};