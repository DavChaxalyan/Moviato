// import * as yup from "yup";


// export const schema_login = yup.object().shape({
//   email: yup
//     .string()
//     .email("Email should have correct format")
//     .required("Email is a required field"),
//   password: yup
//     .string()
//     .min(8)
//     .max(32)
//     .required("No password provided.")
//     .min(8, "8 chars minimum.")
//     .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
//   remember: yup.bool().oneOf([false]).notRequired(),
// });

// export const schema_registration = yup.object().shape({
//   email: yup
//     .string()
//     .email("Email should have correct format")
//     .required("Email is a required field"),
//   password: yup
//     .string()
//     .min(8)
//     .max(32)
//     .required("No password provided.")
//     .min(8, "8 chars minimum.")
//     .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
//   confirmPwd: yup
//     .string()
//     .required("No password provided")
//     .oneOf([yup.ref("password")], "Passwords does not match"),
//   country: yup.string().required("Select an Country"),
//   firstName: yup
//     .string()
//     .max(40)
//     .min(3, "First Name must be at least 3 characters")
//     .required("Required First Name"),
//   lastName: yup
//     .string()
//     .max(40)
//     .min(3, "Surname Name must be at least 3 characters")
//     .required("Required Last Name"),
//   nickName: yup
//     .string()
//     .max(40)
//     .min(3, "Nick Name must be at least 3 characters")
//     .required("Required Last Name"),
//   age: yup
//     .number()
//     .typeError("Please set number")
//     .integer()
//     .nullable(true)
//     .min(5, "Minimal Age 5")
//     .required("Required Age"),
// });
