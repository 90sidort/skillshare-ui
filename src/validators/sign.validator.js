import * as Yup from "yup";

export const validationSchemaSignIn = Yup.object({
  username: Yup.string()
    .required("Username required!")
    .min(3, "Cannot be shorter than 3 characters!")
    .max(300, "Cannot be longer than 300 characters!"),
  password: Yup.string()
    .required("Password required")
    .min(3, "Cannot be shorter than 3 characters!")
    .max(300, "Cannot be longer than 300 characters!"),
});

export const validationSchemaSignUp = Yup.object({
  username: Yup.string()
    .required("Username required!")
    .min(3, "Cannot be shorter than 3 characters!")
    .max(300, "Cannot be longer than 300 characters!"),
  name: Yup.string()
    .required("Name required")
    .min(3, "Cannot be shorter than 3 characters!")
    .max(300, "Cannot be longer than 300 characters!"),
  surname: Yup.string()
    .required("Surname required")
    .min(3, "Cannot be shorter than 3 characters!")
    .max(300, "Cannot be longer than 300 characters!"),
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email required!")
    .min(5, "Cannot be shorter than 5 characters!")
    .max(300, "Cannot be longer than 300 characters!"),
  password: Yup.string()
    .required("Password required")
    .min(3, "Cannot be shorter than 6 characters!")
    .max(300, "Cannot be longer than 16 characters!"),
  retype: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match!"
  ),
  about: Yup.string().max(2000, "Cannot be longer than 2000 characters!"),
});
