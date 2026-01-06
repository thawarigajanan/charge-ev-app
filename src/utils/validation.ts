import * as yup from "yup";

const carTypes = ["Tata", "MG", "Citron", "Mahindra", "Maruti Suzuki"];

export const loginSchema = yup.object({
  phoneOrEmail: yup
    .string()
    .required("Phone number or email is required")
    .test("is-valid-input", 
      "Please enter a valid phone number or email",
      (value) => {
        if (!value) return false;
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(value)) return true;
        
        // Phone validation (10 digits)
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(value);
      }
    ),
});

export const profileSchema = yup.object({
  fullName: yup.string().required("Full name is required").min(2, "Name is too short"),
  carType: yup.string().required("Please select a car type").oneOf(
    carTypes,
    "Invalid car type"
  ),
});
