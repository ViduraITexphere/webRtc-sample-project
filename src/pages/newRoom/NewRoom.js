import React, { useState } from "react";


const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
  }

function NewRoom() {
  const [roomData, setRoomData] = useState("");
  console.log("roomdata",roomData);
    const [randomId, setRandomId] = useState("");


    const handleInputChange = (e) => {
        e.preventDefault();
    setRoomData(e.target.value);
    };

  const handleRoomData = async (e) => {
    
    const newId = generateRandomId();
    setRandomId(newId);

    console.log(roomData);

    fetch("http://localhost:5000/room/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify ({ roomName: roomData }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    //   window.location.href = '/room/: 
    window.location.href = `/room/${newId}`;
  };
  return (

      <div
        className="form_wrapper"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >

        <h1>Create a new room</h1>
        <input value={roomData} onChange={handleInputChange} type="text" placeholder="Room name" />
        <button onClick={handleRoomData} type="submit" >
          Create room
        </button>
      </div>
  );
}

export default NewRoom;
