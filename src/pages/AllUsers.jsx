import React, { useEffect, useState } from "react";
import { getAllUsersAPI } from "../services/allApi";

function AllUsers() {
  const [userDetils, setUserDetils] = useState([])

  //function to get all users
  const getAllUsers = async () => {
    const result = await getAllUsersAPI()
    if (result.status === 200) {
      console.log(result.data);
      setUserDetils(result.data)
    }
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-5 my-10">
      <h3 className="text-center text-3xl font-bold mb-5">
        All <span className="text-red-500">Users</span>
      </h3>

      <div className="bg-white shadow-lg rounded-lg p-5">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">#</th>
                <th className="p-3">User Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {userDetils?.length > 0 ? (
                userDetils.map((user, index) => (
                  <tr key={user.id} className="border-b">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className={`p-3 font-bold ${user.role === "Admin" ? "text-green-500" : "text-blue-500"}`}>
                      {user.role}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-3 text-center">No users available</td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
