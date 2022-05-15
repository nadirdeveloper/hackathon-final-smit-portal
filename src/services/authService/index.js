import { notification } from "antd"
import { firebase } from "../../config/firebase"
import { logoutUser } from "../../redux/slices/user/userSlice"
const login = async (email, password) => {
    const response = await firebase.signInWithEmailAndPassword(firebase.auth, email, password).then((result) => {
        return result
    }).then((result) => {
        const docRef = firebase.firestore.doc(firebase.firestore.db, 'users/' + result.user.uid)
        const userResponse = firebase.firestore.getDoc(docRef, "users", result.user.uid).then((userSnap) => {
            const userData = userSnap.data()
            return {
                success: true,
                message: "Login Successful",
                userData: userData
            }
        }).catch((err) => {
            if (err) {
                console.log(err)
                return {
                    success: false,
                    message: "Login Failed",
                    userData: null
                }
            }
        });
        return userResponse
    }).catch((err) => {
        return {
            success: false,
            message: err.message
        }
    })
    return response
}

const register = async (email, password, rollNo, cnic) => {
    const response = await firebase.createUserWithEmailAndPassword(firebase.auth, email, password).then((result) => {
        return result
    }).then((result) => {
        
        const docRef = firebase.firestore.doc(firebase.firestore.db, 'users/' + result.user.uid)
        const userResponse = firebase.firestore.setDoc(docRef,  {
            rollNo: rollNo,
            userId: result.user.uid,
            cnic: cnic,
            email: email,
            role: "student",
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
        }).then((userSnap) => {
            return {
                success: true,
                message: "Register Successful",
                userData: {
                    rollNo: rollNo,
                    cnic: cnic,
                    email: email,
                    role: "student",
                    createdAt: new Date().getTime(),
                    updatedAt: new Date().getTime()
                }
            }
        }).catch((err) => {
            if (err) {
                console.log(err)
                return {
                    success: false,
                    message: "Register Failed",
                    userData: null
                }
            }
        });
        return userResponse
    }).catch((err) => {
        return {
            success: false,
            message: err.message
        }
    })
    return response
}

const logout = async (dispatch, currentUserData) => {
   const response = await firebase.auth.signOut().then(() => {
        dispatch(logoutUser())
        notification.success({
            message: "Logout Successful",
            description: "You have been logged out successfully"
        })
        return currentUserData;
    }).catch((err) => {
        notification.error({ message: "Error", description: err.message })
        return false;
    });
    return response
}
export const authService = {
    login,
    register,
    logout,
}