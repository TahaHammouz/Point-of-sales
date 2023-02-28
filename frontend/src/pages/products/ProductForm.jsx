import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Modal, Button, Input, Select } from "antd";
import { addProductData } from "../../redux/slices/productSlice";
import { notification } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";

const { Option } = Select;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  image: Yup.string()
    .required("Image URL is required")
    .matches(
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/,
      "Please enter a valid image URL"
    ),
  price: Yup.number()
    .moreThan(0, "Price must be greater than 0")
    .required("Price is required"),
  category: Yup.string().required("Category is required"),
  code: Yup.string().required("Code is required"),
});

const ProductForm = () => {
  const [visible, setVisible] = useState(false);
  const categories = useSelector((state) => state.categories.categories);
  const products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const existingProduct = products.find(
      (product) => product.code === values.code
    );
    if (existingProduct) {
      notification.error({
        message: "Error",
        description: "Product code already exists on the server",
      });
      setSubmitting(false);
      return;
    }

    dispatch(addProductData(values));
    setSubmitting(false);
    resetForm();
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ float: "right" }}>
        Add Product
      </Button>
      <Modal
        title="Product form"
        open={visible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
        maskClosable={false}
      >
        <Formik
          initialValues={{
            name: "",
            image: "",
            price: "",
            category: "",
            code: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <label htmlFor="name">Product Name</label>
              <Field name="name" as={Input} />
              <ErrorMessage name="name" />

              <label htmlFor="image">Image URL</label>
              <Field name="image" as={Input} type="url" />
              <ErrorMessage name="image" />

              <label htmlFor="price">Price</label>
              <Field name="price" as={Input} type="number" />
              <ErrorMessage name="price" />

              <label htmlFor="category">Category</label>
              <Field name="category">
                {({ field, form }) => (
                  <Select
                    {...field}
                    onChange={(value) => form.setFieldValue(field.name, value)}
                  >
                    <Option value="">Select a category</Option>
                    {categories.map((category) => (
                      <Option key={category.id} value={category.category}>
                        {category.category}
                      </Option>
                    ))}
                  </Select>
                )}
              </Field>
              {touched.category && errors.category && (
                <div style={{ color: "red" }}>{errors.category}</div>
              )}
              <br />

              <label htmlFor="code">Code</label>
              <Field name="code" as={Input} />
              {touched.code && errors.code && (
                <div style={{ color: "red" }}>{errors.code}</div>
              )}

              <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
export default ProductForm;
