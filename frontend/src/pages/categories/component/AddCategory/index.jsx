import { useState } from "react";
import { Modal, Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { saveCategory } from "src/redux/slices/categorySlice";

const validationSchema = Yup.object().shape({
  category: Yup.string().required("Category name is required"),
});

const AddCategory = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const newCategory = { id: Date.now(), category: values.category };
      dispatch(saveCategory(newCategory));
      setVisible(false);
      formik.resetForm();
    },
  });

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    formik.resetForm();
  };

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ float: "right" }}>
        Add Category
      </Button>
      <Modal
        title="Add Category"
        open={visible}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        okButtonProps={{ disabled: formik.isSubmitting }}
      >
        <Input
          placeholder="Category Name"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.category && formik.errors.category && (
          <div style={{ color: "red" }}>{formik.errors.category}</div>
        )}
      </Modal>
    </>
  );
};

export default AddCategory;
