import React from 'react'
import { connect } from 'react-redux';

const ActiveUsers = ({activeUsers})=> {
    console.log("active user",activeUsers);

    
  return (
    <div>
        <h4>Active Users</h4>
        {activeUsers.map((user) => {
            return (
                <div key={user.socketId}>
                    <h5>{user.username}</h5>
                </div>
            )
        })}
    </div>
    )
}

    const mapStateToProps = ({auth}) => ({
        ...auth
    });
export default connect(mapStateToProps) (ActiveUsers);