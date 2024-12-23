import { FC, useEffect, useState } from "react";
import { api } from "../../api/axiosClient";
import { Category } from "../HomePage/types";
import { useAuthContext } from "../Auth/context/auth-context";

interface SelectSubCategoryProps {
  subcategory: number | null;
  setSubcategory: Function;
}

const SelectSubCategory: FC<SelectSubCategoryProps> = ({
  subcategory,
  setSubcategory,
}) => {
  const { user } = useAuthContext();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState<Category>({
    id: 0,
    name: "",
  });
  const [subcategories, setSubcategories] = useState([]);

  //fetch categories on load
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/categories/");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  //fetch subcategories when category selected
  useEffect(() => {
    if (category.id !== 0) {
      const fetchSubcategories = async () => {
        try {
          const response = await api.get(`/categories/${category.id}`);
          setSubcategories(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchSubcategories();
    }
  }, [category]);

  return (
    <div className="col-center">
      <h3 className="subtitle">
        {user?.is_trainer
          ? "Z czego oferujesz pomoc?"
          : "W czym potrzebujesz pomocy?"}
      </h3>
      <div className="row-small-space">
        <select
          className="form-select shadow"
          name=""
          id=""
          onChange={(e) => {
            const selectedCategory = categories.find(
              (category: Category) => category.id === parseInt(e.target.value)
            );
            if (selectedCategory) {
              setCategory(selectedCategory);
              setSubcategory({ id: 0, name: "" }); // Reset subcategory
            }
          }}
        >
          <option selected disabled>
            Kategoria
          </option>
          {categories?.map((category: Category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>
        <select
          name=""
          id=""
          disabled={category.id === 0}
          className="form-select shadow"
        >
          <option selected disabled>
            Podkategoria
          </option>
          {subcategories?.map((subcategory: Category) => (
            <option value={subcategory.id}>{subcategory.name}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectSubCategory;
