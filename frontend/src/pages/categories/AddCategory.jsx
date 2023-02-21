import { useState } from "react";
import { Modal, Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { addCategory } from "../../redux/slices/categorySlice";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  categoryName: Yup.string().required("Category name is required"),
});

const AddCategory = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      categoryName: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(addCategory({ id: Date.now(), category: values.categoryName }));
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
      <Button type="primary" onClick={showModal} style={{float:"right"}}>
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
          name="categoryName"
          value={formik.values.categoryName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.categoryName && formik.errors.categoryName && (
          <div style={{ color: "red" }}>{formik.errors.categoryName}</div>
        )}
      </Modal>
    </>
  );
};

export default AddCategory;
