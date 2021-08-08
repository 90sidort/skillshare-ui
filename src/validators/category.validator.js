import * as Yup from "yup";

export const validationCategory = Yup.object({
  name: Yup.string()
    .required("Name required!")
    .min(3, "Cannot be shorter than 3 characters!")
    .max(400, "Cannot be longer than 400 characters!"),
});
