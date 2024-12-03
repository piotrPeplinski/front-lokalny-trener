import { FC, useEffect, useState } from "react";
import api from "../../../api/axiosClient";
import { Category } from "../types";
import { HomeIcon } from "../../../assets/icons/icons";

const SearchTrainer: FC<{}> = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState<Category>({
    id: 0,
    name: "",
  });
  const [subcategories, setSubcategories] = useState([]);
  const [subcategory, setSubcategory] = useState({
    id: 0,
    name: "",
  });
  const [remote, setRemote] = useState(false);
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
    <div className="search-container">
      <div className="row">
        <h1>
          Znajdź idealnego specjalistę i umów zajęcia w kilka chwil – szybko,
          wygodnie, skutecznie!
        </h1>
        <form action="">
          <div className="form-col">
            <h3>Gdzie chcesz odbyć zajęcia?</h3>
            <div className="form-row">
              <input type="text" placeholder="Wpisz miasto" disabled={remote} />
              <div
                onClick={() => setRemote(!remote)}
                className={`remote-btn ${remote ? "clicked" : ""}`}
              >
                <HomeIcon />
                <p>Zdalnie</p>
              </div>
            </div>
          </div>
          <div className="form-col">
            <h3>W czym potrzebujesz pomocy?</h3>
            <div className="form-row">
              <select
                name=""
                id=""
                onChange={(e) => {
                  const selectedCategory = categories.find(
                    (category: Category) =>
                      category.id === parseInt(e.target.value)
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
              <select name="" id="" disabled={category.id === 0}>
                <option selected disabled>
                  Podkategoria
                </option>
                {subcategories?.map((subcategory: Category) => (
                  <option value={subcategory.id}>{subcategory.name}</option>
                ))}
              </select>
            </div>
          </div>
          {/* <button>Wyszukaj</button> */}
        </form>
      </div>
    </div>
  );
};

export default SearchTrainer;
