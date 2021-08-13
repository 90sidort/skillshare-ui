import * as Yup from "yup";

export const validationSkill = Yup.object({
  name: Yup.string()
    .required("Name required!")
    .min(3, "Cannot be shorter than 3 characters!")
    .max(200, "Cannot be longer than 200 characters!"),
  catId: Yup.number()
    .required("Category id required")
    .min(1, "Category id should be correct"),
  description: Yup.string()
    .required("Description required!")
    .min(3, "Cannot be shorter than 3 characters!")
    .max(400, "Cannot be longer than 400 characters!"),
});
