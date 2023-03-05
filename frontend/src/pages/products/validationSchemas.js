import * as Yup from "yup";

export const productValidationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  image: Yup.string()
    .required("Image URL is required")
    .matches(
      /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i,
      "Please enter a valid image URL"
    ),
  price: Yup.number()
    .moreThan(0, "Price must be greater than 0")
    .required("Price is required"),
  category: Yup.string().required("Category is required"),
  code: Yup.string()
    .required("Code is required")
    .matches(/^([A-Z0-9]){3}-([A-Z0-9]){3}-([A-Z0-9]){3}$/, {
      message: "Please enter a valid code",
      excludeEmptyString: true,
    }),
});
