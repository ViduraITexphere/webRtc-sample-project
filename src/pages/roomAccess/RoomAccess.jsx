import React from 'react'

function RoomAccess() {

    const handleClick = () => {
        console.log("clicked")
        window.location.href = "/newRoom"
    }
  return (
    <div>
        <div className="container" style={{display:"flex", justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
        <h1>Room Access</h1>
        <button onClick={handleClick} style={{padding:'10px 30px', backgroundColor:"green", border:"none", borderRadius:"5px", color: "white"}}>Create Room</button>
        </div>
    </div>
  )
}

export default RoomAccess