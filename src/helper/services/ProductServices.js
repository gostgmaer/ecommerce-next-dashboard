import requests from "./httpServices";

const ProductServices = {
  // Create a new product (admin only)
  createProducts: async (body, headers) => {
    return requests.post("/products", body, headers);
  },

  // Create products in bulk (admin only)
  createProductBulk: async (body, headers) => {
    return requests.post("/products/bulk", body, headers);
  },

  // Get all products
  getAllProducts: async (query, headers) => {
    return requests.get("/products", query, null, headers, 1);
  },


  // Get a single product by ID
  getSingleProducts: async (id, headers,token) => {
    return requests.get(`/products/${id}`, null, null, headers, 1,token);
  },


  // Update a product by ID (partial update)
  updateProductPatch: async (id, body, headers) => {
    return requests.patch(`/products/${id}`, body,null, headers);
  },

  // Update a product by ID (complete update)
  updateProductPut: async (id, body, headers) => {
    return requests.put(`/products/${id}`, body,null, headers);
  },

  // Delete a product by ID (admin only)
  deleteProduct: async (id, headers) => {
    return requests.delete(`/products/${id}`,null, headers);
  },
};


export default ProductServices;
