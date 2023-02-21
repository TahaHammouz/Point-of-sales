import { Formik, Form, Field } from "formik";
import Modal from "../../components/UI/Modal/Modal";
import styles from "./ProductForm.module.css";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/slices/productSlice";

const initialValues = {
  name: "",
  image: "",
  price: "",
  category: "",
  code: "",
};

const ProductForm = ({ hideModalHandler }) => {
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(
      addProduct({
        name: values.name,
        image: values.image,
        price: values.price,
        category: values.category,
        code: values.code,
      })
    );
    console.log(values);
  };

  return (
    <Modal onClose={hideModalHandler}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className={styles.form} style={{ justifyContent: "flex-end" }}>
          <label htmlFor="productName" className={styles.label}>
            Product Name
          </label>
          <Field
            id="name"
            name="name"
            placeholder="Enter product name"
            className={styles.input}
            required
          />

          <label htmlFor="image" className={styles.label}>
            Image URL
          </label>
          <Field
            id="image"
            name="image"
            placeholder="Enter image URL"
            className={styles.input}
            required
          />

          <label htmlFor="price" className={styles.label}>
            Price
          </label>
          <Field
            id="price"
            name="price"
            type="number"
            placeholder="Enter price"
            className={styles.input}
            required
          />

          <label htmlFor="category" className={styles.label}>
            Category
          </label>
          <Field
            as="select"
            id="category"
            name="category"
            placeholder="Enter category"
            className={styles.input}
            required
          >
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
            required
          />
          <div className={styles.actions}>
            <button
              type="submit"
              id="action"
              name="action"
              className={styles.button}
              onClick={hideModalHandler}
            >
              Cancel
            </button>
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default ProductForm;
