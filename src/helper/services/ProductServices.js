import requests from "./httpServices";

const ProductServices = {
  // Create a new product (admin only)
  createProduct: async (body, headers) => {
    return requests.post("/products", body, headers);
  },

  // Create products in bulk (admin only)
  createProductBulk: async (body, headers) => {
    return requests.post("/products/bulk", body, headers);
  },

  // Get all products
  getProducts: async (query, headers) => {
    return requests.get("/products", query, null, headers, 1);
  },

  // Get current products
  getCurrentProducts: async (query, headers) => {
    return requests.get("/products/show", query, null, headers, 1);
  },

  // Get related products
  getRelatedProducts: async (query, headers) => {
    return requests.get("/products/related", query, null, headers, 1);
  },

  // Get discounted products
  getDiscountedProducts: async (query, headers) => {
    return requests.get("/products/discount", query, null, headers, 1);
  },

  // Get popular products
  getPopularProducts: async (query, headers) => {
    return requests.get("/products/popular", query, null, headers, 1);
  },

  // Get a single product by ID
  getSingleProductById: async (id, headers) => {
    return requests.get(`/products/${id}`, null, null, headers, 1);
  },

  // Get a single product by slug
  getSingleProductBySlug: async (slug, headers) => {
    return requests.get(`/products/view/${slug}`, null, null, headers, 1);
  },

  // Get current single product details
  getCurrentSingleProductDetails: async (query, headers) => {
    return requests.get("/products/details", query, null, headers, 1);
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
