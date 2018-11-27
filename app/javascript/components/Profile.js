import React from 'react'


class Profile extends React.Component {
      render(){
        return (
          <div>
          <div className="nav">
            <Link to="/">Home  |</Link>
            <Link to="/Profile">Profile  |</Link>
            <Link to="/SearchStock">Search Stock |</Link>
          </div>
          </div>

        )
      }
    }

  export default Profile
