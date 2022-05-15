import { Spin } from 'antd';
import React, { useEffect } from 'react'
import Topbar from '../../../components/Layout/Topbar'
import { firebase } from '../../../config/firebase';
import styles from './index.module.css';
function Home() {
    const [feeds, setFeeds] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    useEffect(() => {
        fetchFeeds();
    }, [])

    const fetchFeeds = async () => {
        const { db, collection, getDocs } = firebase.firestore;
        const feedRef = collection(db, 'feeds');
        const feedSnaps = await getDocs(feedRef);
        const allFeeds = feedSnaps.docs.map(snap => {
            return {
                ...snap.data(),
                id: snap.id
            }
        });
        setFeeds(allFeeds);
        setLoading(false);
    }

    return (
        <div>
            <Topbar>
                <h2 className='main-heading'>News Feed</h2>
                <div className={styles.feedsContainer}>
                    <div className={styles.feeds}>
                        {
                            loading ? (
                                <div>
                                    <Spin />
                                </div>
                            ) : feeds.map((item) => (
                                <div className={styles.feedCard}>
                                    <h3><img src={item.profileImg} className={styles.feedCardProfileImg} alt={item.id} />  {item.feedProfileName}</h3>
                                    <h5>Created: {item.feedTime}</h5>
                                    <p>{item.feedText}</p>
                                        <img src={item.feedImg} className={styles.feedImage} alt={item.id} />
                                </div>
                            ))
                        }

                    </div>
                </div>
            </Topbar>
        </div>
    )
}

export default Home