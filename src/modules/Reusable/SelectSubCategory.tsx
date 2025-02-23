import { FC, useEffect, useRef, useState } from "react";
import { api } from "../../api/axiosClient";
import { Category } from "../HomePage/types";
import { useAuthContext } from "../Auth/context/auth-context";
import { getErrorMessage } from "./utils";

interface SelectSubCategoryProps {
  subcategory: Category;
  setSubcategory: Function;
  selectedCategory?: Category;
}

const SelectSubCategory: FC<SelectSubCategoryProps> = ({
  subcategory,
  setSubcategory,
  selectedCategory,
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
      } catch (error: any) {
        const message = getErrorMessage(
          error,
          "Błąd podczas pobierania kategorii."
        );
        alert(message);
      }
    };
    fetchCategories();
    if (selectedCategory) {
      setCategory(selectedCategory);
    }
  }, [selectedCategory]);

  //fetch subcategories when category selected
  useEffect(() => {
    if (category.name !== "") {
      const fetchSubcategories = async () => {
        try {
          const response = await api.get(`/categories/${category.id}`);
          setSubcategories(response.data);
        } catch (error: any) {
          const message = getErrorMessage(
            error,
            "Błąd podczas pobierania podkategorii."
          );
          alert(message);
        }
      };
      fetchSubcategories();
    }
    if (!selectedCategory) {
      setSubcategory({ id: 0, name: "" });
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
          defaultValue={"Kategoria"}
          className="form-select shadow"
          value={selectedCategory ? category.id : undefined}
          onChange={(e) => {
            const selectedCat = categories.find(
              (category: Category) => category.id === parseInt(e.target.value)
            );
            if (selectedCat) {
              setCategory(selectedCat);
              setSubcategory({ id: 0, name: "" }); // Reset subcategory
            }
          }}
        >
          <option disabled>Kategoria</option>
          {categories?.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          defaultValue={"Podkategoria"}
          disabled={category.name === ""}
          value={subcategory.name === "" ? undefined : subcategory.id}
          className="form-select shadow"
          onChange={(e) => {
            const selectedSubCategory = subcategories.find(
              (subcategory: Category) =>
                subcategory.id === parseInt(e.target.value)
            );
            if (selectedSubCategory) {
              setSubcategory(selectedSubCategory);
            }
          }}
        >
          <option disabled>Podkategoria</option>
          {subcategories?.map((subcategory: Category) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectSubCategory;
