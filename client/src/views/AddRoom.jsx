import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export default function AddRoom({ url }) {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  function handleBack() {
    navigate("/");
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${url}/rooms`,
        { name: roomName, imageUrl: imageUrl },
        { headers: { Authorization: `Bearer ${localStorage.access_token}` } }
      );
      console.log(data,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      navigate("/");
      setRoomName("");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2 className="text-2xl font-bold mb-4">Create a Room</h2>
          <input
            type="text"
            className="border p-2 w-full mb-4"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name"
          />
          <input
            type="text"
            className="border p-2 w-full mb-4"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter link url"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Room
          </button>
        </form>
        <button
          onClick={handleBack}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Back
        </button>
      </div>
    </div>
  );
}