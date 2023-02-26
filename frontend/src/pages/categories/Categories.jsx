import CategoryTable from "./CategoryTable";
import AddCategory from "./AddCategory";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/slices/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <AddCategory />
      <CategoryTable />
    </>
  );
};

export default Categories;
