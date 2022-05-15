import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUserData, setLoading, setUser } from '../../redux/slices/user/userSlice';
import { firebase } from '../../config/firebase'
import { notification } from 'antd';

export default function CurrentUserWrapper({ children }) {
    const dispatch = useDispatch()
    const loading = useSelector(state => state.user.loading)
    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
            dispatch(setUser(user))
            if (user) {
                setUserData(user);
            }else{
                dispatch(setLoading(false))
            }
        });
        return () => unsubscribe();
    }, []);

    const setUserData = async (user) => {
        const docRef = firebase.firestore.doc(firebase.firestore.db, 'users/' + user.uid)
        firebase.firestore.getDoc(docRef, "users", user.uid).then((userSnap) => {
            const userData = userSnap.data();
            dispatch(setCurrentUserData(userData))
            dispatch(setLoading(false))
        }).catch((err) => {
            if (err) {
                console.log(err)
                notification.error({ message: "Error", description: "Something Went Wrong" })
            }
        });
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {children}
        </div>
    )
}
