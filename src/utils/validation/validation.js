import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().min(8).max(12).required("Password is required"),
});

export const registerValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().min(8).required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  isAgreed: Yup.boolean().oneOf(
    [true],
    "You must agree to the Terms and Privacy Policy"
  ),
});

export const forgetPasswordValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const resetPasswordValidation = Yup.object().shape({
  password: Yup.string().min(8).required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const requiredMsg = "This field is required";
export const productSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  slug: Yup.string().required('Slug is required'),
  sku: Yup.string().required('SKU is required'),
  productType: Yup.string().required('Product Type is required'),
  categories: Yup.string().required('Categories is required'),
  descriptions: Yup.string().required('Description is required'),
 
  price: Yup.number().min(0, 'Price must be a non-negative number').required('Price is required'),
  costPrice: Yup.number().min(0, 'Cost Price must be a non-negative number').required('Cost Price is required'),
  retailPrice: Yup.number().min(0, 'Retail Price must be a non-negative number').required('Retail Price is required'),
  salePrice: Yup.number().min(0, 'Sale Price must be a non-negative number').required('Sale Price is required'),
  // trackInventory: Yup.string().required('Tracking Inventory is required'),
  currentStockLevel: Yup.number().min(0, 'Current Stock Level must be a non-negative number').required('Current Stock Level is required'),
  lowStockLevel: Yup.number().min(0, 'Low Stock Level must be a non-negative number').required('Low Stock Level is required'),
  gtin: Yup.string().required('GTIN is required'),
  manufacturerPartNumber: Yup.string().required('Manufacturer Part Number is required'),
  brandName: Yup.string().required('Brand Name is required'),
  productUPCEAN: Yup.string().required('Product UPC/EAN is required'),
  pageTitle: Yup.string().required('SEO Title is required'),
  metaDescription: Yup.string(),
  metaKeywords:Yup.string(),

})

export const validateCategory = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  slug: Yup.string().required('Slug is required'),
  parent_category: Yup.string(),
  display_type: Yup.string(),
  descriptions: Yup.string(),
});

