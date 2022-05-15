import React from 'react'
import { useSelector } from 'react-redux'
import Topbar from '../../../components/Layout/Topbar'

function UserHome() {
    const {user} = useSelector(state => state.user);
  return (
    <Topbar>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          minHeight: '80vh',
        }}
      >
          <h3>Welcome {user?.email}</h3>
        </div>
    </Topbar>
  )
}

export default UserHome