import { useState } from "react";

export const useRandomUser = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const getRandomUser = async () => {
    setLoading(true);
    try {
      console.log("Fetching user..."); // Debugging log
      const response = await fetch("https://randomuser.me/api/");
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("User data received:", data);
  
      setUsers((prevUsers) => [...prevUsers, data.results[0]]);
      setSelectedUser(data.results[0]);
    } catch (error) {
      console.error("Fetching user failed:", error);
      alert("Error fetching user. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };
  

  return { users, selectedUser, setSelectedUser, getRandomUser, loading };
};


