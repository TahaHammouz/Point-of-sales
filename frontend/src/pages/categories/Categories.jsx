import CategoryTable from "./CategoryTable";
import AddCategory from "./AddCategory";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/slices/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <AddCategory />
      <CategoryTable categories={categories} />
    </>
  );
};

export default Categories;
