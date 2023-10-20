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

export const ProductValidation = Yup.object().shape({
  title: Yup.string().required(requiredMsg),
  sku: Yup.string().required(requiredMsg),
  productType: Yup.string().required(requiredMsg),
  categories: Yup.string().required(requiredMsg),
  descriptions: Yup.string().required(requiredMsg),
  price: Yup.string().required(requiredMsg),
  costPrice: Yup.string().optional(),
  trackInventory: Yup.string().required(requiredMsg),
  currentStockLevel: Yup.string().required(requiredMsg),
  lowStockLevel: Yup.string().required(requiredMsg),
  gtin: Yup.string().required(requiredMsg),
  brandName: Yup.string().required(requiredMsg),
});
