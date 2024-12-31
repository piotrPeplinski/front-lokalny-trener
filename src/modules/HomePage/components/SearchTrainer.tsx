import { FC, FormEvent, useEffect, useState } from "react";
import { api } from "../../../api/axiosClient";
import { Category } from "../types";
import { HomeIcon, SearchIcon } from "../../../assets/icons/icons";
import { useNavigate } from "react-router-dom";

const SearchTrainer: FC<{}> = () => {
  const navigate = useNavigate();
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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    navigate(`/search/${subcategory.id}`);
  };

  return (
    <div className="search-container">
      <section>
        <div className="row">
          <h1>
            Znajdź idealnego specjalistę i umów zajęcia w kilka chwil – szybko,
            wygodnie, skutecznie!
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-col">
              <h3>Gdzie chcesz odbyć zajęcia?</h3>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Wpisz miasto"
                  disabled={remote}
                />
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
                <select
                  disabled={category.id === 0}
                  onChange={(e) => {
                    const selectedSub = subcategories.find(
                      (sub: Category) => sub.id === parseInt(e.target.value)
                    );
                    if (selectedSub) {
                      setSubcategory(selectedSub);
                    }
                  }}
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
            <button className="btn btn-light" type="submit">
              <SearchIcon />
              <p>Wyszukaj</p>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SearchTrainer;
