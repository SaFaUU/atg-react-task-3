import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import avatar from './Assets/avatar.png'

function App() {
  const [data, setData] = useState([])
  const [userDetails, setUserDetails] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users')
      .then(data => {
        // console.log(data);
        setUserDetails(data.data[0])
        setData(data.data)
        setLoading(false)
      })
  }, [])
  const handleClick = (details) => {
    // console.log(details)
    setUserDetails(details)
  }
  if (loading) {
    return <div class="spinner-border text-secondary position-absolute top-50 start-50 translate-middle" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  }

  return (
    <div className="App d-flex padding-top justify-content-center">
      <div className='me-5'>
        <div className="list-group-item mb-3 rounded-top user-heading fw-semibold text-left border-0 d-flex mx-auto justify-content-center align-items-center">
          USERS LIST
        </div>
        <div className="list-group align-items-center">
          {
            data && data?.map(user => <div
              className={`list-group-item list-group-item-action mb-3 rounded-1 user-style fw-semibold text-left border-0 d-flex align-items-center ${userDetails === user ? "selected" : ""}`}
              key={user.id}
              aria-hidden="true"
              onClick={() => handleClick(user)}
            >
              <div>
                {
                  user.avatar ?
                    <img src={avatar} alt="" className='user-image' />
                    :
                    <img src={user.avatar} alt="" className='w-25' />
                }
              </div>
              <div>
                {`${user.profile.firstName} ${user.profile.lastName}`}
              </div>
            </div>)
          }
        </div>
      </div>
      <div className='h-100 d-flex flex-column align-items-center justify-content-center'>
        <div className="list-group-item mb-3 rounded-top user-heading fw-semibold text-left border-0 d-flex mx-auto justify-content-center align-items-center">
          USERS DETAILS
        </div>
        {
          loading && <div class="spinner-border text-secondary h-100" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        }
        {
          <img src={avatar} alt="" className='details-img-margin' />
        }
        <p className='fw-semibold fs-4 mt-4'>@{userDetails?.profile?.username}</p>
        <div className="mb-3 w-100 mx-auto d-flex align-items-center flex-column">

          <div>
            {
              <p className="form-control text-wrap user-details-box fs-5 fw-semibold border border-dark">{userDetails?.Bio}</p>
            }
          </div>
          <div>
            <label className="form-label fw-semibold mt-5">Full Name</label>
            <p className="form-control text-wrap user-details-box fs-5 fw-semibold border border-dark">{
              `${userDetails?.profile?.firstName} ${userDetails?.profile?.lastName}`
            }</p>
          </div>
          <div>
            <label className="form-label fw-semibold mt-2">Job Title</label>
            <p className="form-control text-wrap user-details-box fs-5 fw-semibold border border-dark">{
              userDetails?.jobTitle
            }</p>
          </div>
          <div>
            <label className="form-label fw-semibold mt-2">Email</label>
            <p className="form-control text-wrap user-details-box fs-5 fw-semibold border border-dark">{
              userDetails?.profile?.email
            }</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
