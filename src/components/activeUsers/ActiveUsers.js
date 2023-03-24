import React from 'react'

function ActiveUsers() {

    const users = [
        {
            cocket_id: "123",
            username: "user1"
        },
        {
            cocket_id: "456",
            username: "user2"
        },
        {
            cocket_id: "789",
            username: "user3"
        },
        {
            cocket_id: "101",
            username: "user4"
        }
    ];
  return (
    <div>
        <h4>Active Users</h4>
        {users.map((user) => {
            return (
                <div key={user.cocket_id}>
                    <h5>{user.username}</h5>
                </div>
            )
        })}
    </div>
    )
}
export default ActiveUsers