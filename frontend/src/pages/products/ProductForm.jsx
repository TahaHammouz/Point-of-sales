import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Modal, Button, Input, Select } from "antd";
const { Option } = Select;
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  imageUrl: Yup.string().required("Image URL is required"),
  price: Yup.number().required("Price is required"),
  code: Yup.string().required("Code is required"),
});

const ProductForm = () => {
  const [visible, setVisible] = useState(false);
  const categories = useSelector((state) => state.categories.categories);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
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
      >
        <Formik
          initialValues={{
            name: "",
            imageUrl: "",
            price: "",
            code: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <label htmlFor="name">Product Name</label>
              <Field name="name" as={Input} />

              {touched.name && errors.name && (
                <div style={{ color: "red" }}>{errors.name}</div>
              )}

              <label htmlFor="imageUrl">Image URL</label>
              <Field name="imageUrl" as={Input} />

              {touched.imageUrl && errors.imageUrl && (
                <div style={{ color: "red" }}>{errors.imageUrl}</div>
              )}

              <label htmlFor="price">Price</label>
              <Field name="price" as={Input} type="number" />

              {touched.price && errors.price && (
                <div style={{ color: "red" }}>{errors.price}</div>
              )}
              <label htmlFor="category">Category</label>
              <Field name="category">
                {({ field }) => (
                  <Select
                    {...field}
                    style={{ width: "100%" }}
                    placeholder="Please select"
                  >
                    {categories.map((category) => (
                      <Option key={category.id} value={category.category}>
                        {category.category}
                      </Option>
                    ))}
                  </Select>
                )}
              </Field>

              <label htmlFor="code">Code</label>
              <Field name="code" as={Input} />

              {touched.code && errors.code && (
                <div style={{ color: "red" }}>{errors.code}</div>
              )}

              <Button type="primary" htmlType="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default ProductForm;
