import { Formik, Form, Field } from "formik";
import Modal from "../../components/UI/Modal/Modal";
import styles from "./ProductForm.module.css";

const initialValues = {
  productName: "",
  image: "",
  price: "",
  category: "",
  code: "",
};

const onSubmit = (values) => {
  console.log(values);
};

const ProductForm = () => (
  <Modal>
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className={styles.form} style={{ justifyContent: "flex-end" }}>
        <label htmlFor="productName" className={styles.label}>
          Product Name
        </label>
        <Field
          id="productName"
          name="productName"
          placeholder="Enter product name"
          className={styles.input}
        />

        <label htmlFor="image" className={styles.label}>
          Image URL
        </label>
        <Field
          id="image"
          name="image"
          placeholder="Enter image URL"
          className={styles.input}
        />

        <label htmlFor="price" className={styles.label}>
          Price
        </label>
        <Field
          id="price"
          name="price"
          placeholder="Enter price"
          className={styles.input}
        />

        <label htmlFor="category" className={styles.label}>Category</label>
        <Field as="select" id="category" name="category" placeholder="Enter category" className={styles.input}>
          <option value="">Select a category</option>
          <option value="books">Books</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="beauty">Beauty</option>
        </Field>

        <label htmlFor="code" className={styles.label}>
          Input Code
        </label>
        <Field
          id="code"
          name="code"
          placeholder="Enter input code"
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Submit
        </button>
      </Form>
    </Formik>
  </Modal>
);

export default ProductForm;
