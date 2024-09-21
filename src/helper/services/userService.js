import requests from "./httpServices";

const UserServices = {
  // Get all users (admin only)
  getUsers: async (query, headers) => {
    return requests.get("/users", query, null, headers, 1);
  },

  adduser: async (body, headers) => {
    return requests.post("/users", body, headers);
  },
  
  // Get a single user by ID
  getUserById: async (id, headers) => {
    return requests.get(`/users/${id}`, null, null, headers, 1);
  },

  // Get the profile of the currently logged-in customer
  getUserProfile: async (headers) => {
    return requests.get("/users/customer/profile", null, null, headers, 1);
  },

  // Update user information by ID (partial update)
  updateUserPatch: async (id, body, headers) => {
    return requests.patch(`/users/${id}`, body, headers);
  },

  // Update user information by ID (complete update)
  updateUserPut: async (id, body, headers) => {
    return requests.put(`/users/${id}`, body, headers);
  },

  // Delete a user by ID (admin only)
  deleteUser: async (id, headers) => {
    return requests.delete(`/users/${id}`,null, headers);
  },
};


export default UserServices;
