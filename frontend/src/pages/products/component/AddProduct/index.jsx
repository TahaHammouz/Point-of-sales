import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Input, Select } from "antd";
import { addProductData } from "src/redux/slices/productSlice";
import { notification } from "antd";
import { Formik, Form, Field } from "formik";
import InputMask from "react-input-mask";
import { productValidationSchema } from "../../validationSchemas";
const { Option } = Select;

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
          validationSchema={productValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <label htmlFor="name">Product Name</label>
              <Field name="name" as={Input} />
              {touched.name && errors.name && (
                <div style={{ color: "red" }}>{errors.name}</div>
              )}
              <br />
              <label htmlFor="image">Image URL</label>
              <Field name="image" as={Input} type="url" />
              {touched.image && errors.image && (
                <div style={{ color: "red" }}>{errors.image}</div>
              )}
              <br />
              <label htmlFor="price">Price</label>
              <Field name="price" as={Input} type="number" />
              {touched.price && errors.price && (
                <div style={{ color: "red" }}>{errors.price}</div>
              )}
              <br />
              <br />
              <label htmlFor="category">Category</label>
              <Field name="category">
                {({ field, form }) => (
                  <Select
                    {...field}
                    onChange={(value) => form.setFieldValue(field.name, value)}
                  >
                    <Option value="">Select a category</Option>
                    {Array.isArray(categories) &&
                      categories.map((category) => (
                        <Option key={category.id} value={category.category}>
                          {category.category}
                        </Option>
                      ))}
                  </Select>
                )}
              </Field>
              <br />
              {touched.category && errors.category && (
                <div style={{ color: "red" }}>{errors.category}</div>
              )}
              <br />
              <label htmlFor="code">Code</label>
              <Field name="code">
                {({ field, form }) => (
                  <InputMask
                    {...field}
                    mask="aaa-aaa-aaa"
                    maskChar=""
                    onChange={(event) => {
                      form.setFieldValue(
                        field.name,
                        event.target.value.toUpperCase()
                      );
                    }}
                  >
                    {(inputProps) => <Input {...inputProps} />}
                  </InputMask>
                )}
              </Field>
              {touched.code && errors.code && (
                <div style={{ color: "red" }}>{errors.code}</div>
              )}
              <br /> <br />
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
