import { useState } from "react";

interface User {
  name: { first: string; last: string };
  picture: { large: string };
  email: string;
  dob: { date: string };
  location: {
    street: { name: string };
    city: string;
    country: string;
  };
  phone: string;
  login: { password: string };
}

export const useRandomUser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const getRandomUser = async () => {
    setLoading(true);
    try {
      console.log("Fetching user...");
      const response = await fetch("https://randomuser.me/api/");
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: { results: User[] } = await response.json();
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
