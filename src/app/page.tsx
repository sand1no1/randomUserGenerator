'use client';
import { useRandomUser } from "./hooks/useRandomUser";

export default function Page() {
  const { users, selectedUser, setSelectedUser, getRandomUser, loading } = useRandomUser();

  return (
    <div className="flex h-screen font-sans">
      <div className="w-64 bg-gray-100 p-5 overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Usuarios</h3>
        <ul className="space-y-2">
          {users.map((user, index) => (
            <li
              key={index}
              className={`cursor-pointer p-2 rounded-md transition-all ${
                selectedUser === user ? "bg-gray-300 font-bold" : "hover:bg-gray-200"
              }`}
              onClick={() => setSelectedUser(user)}
            >
              {user.name.first} {user.name.last}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-6 relative">
        <div className="absolute top-6 right-6">
          <button
            onClick={getRandomUser}
            disabled={loading}
            className="px-5 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition disabled:bg-blue-300"
          >
            {loading ? "Loading..." : "Generate User"}
          </button>
        </div>
        {selectedUser ? (
          <div className="mt-10">
            <h2 className="text-2xl font-bold">{selectedUser.name.first} {selectedUser.name.last}</h2>
            <img
              src={selectedUser.picture.large}
              alt="User"
              className="rounded-full my-4 w-32 h-32 border-4 border-gray-300"
            />
            <p className="text-lg"><strong>Email:</strong> {selectedUser.email}</p>
            <p className="text-lg"><strong>Fecha de nacimiento:</strong> {selectedUser.dob.date.split("T")[0]}</p>
            <p className="text-lg"><strong>Dirección:</strong> {selectedUser.location.street.name}, {selectedUser.location.city}, {selectedUser.location.country}</p>
            <p className="text-lg"><strong>Teléfono:</strong> {selectedUser.phone}</p>
            <p className="text-lg"><strong>Contraseña:</strong> {selectedUser.login.password}</p>
          </div>
        ) : (
          <p className="text-lg mt-10 text-gray-500">Haz clic en un usuario para ver los detalles.</p>
        )}
      </div>
    </div>
  );
}
