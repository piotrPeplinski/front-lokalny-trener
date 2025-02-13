import { FC, useEffect, useState } from "react";
import SelectSubCategory from "../../Reusable/SelectSubCategory";
import { Category } from "../../HomePage/types";
import { api, protectedApi } from "../../../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { AdIcon } from "../../../assets/icons/icons";
import { useProfileContext } from "../../Profile/context/profile-context";

interface ClientAdFormProps {
  adId?: number;
}

const ClientAdForm: FC<ClientAdFormProps> = ({ adId }) => {
  const [category, setCategory] = useState<Category>({ id: 0, name: "" });
  const [subcategory, setSubcategory] = useState<Category>({ id: 0, name: "" });
  const [description, setDescription] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [phone, setPhone] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();
  const { setSelectedFunc } = useProfileContext();
  const { setRefreshAds, refreshAds } = useProfileContext();

  useEffect(() => {
    if (adId) {
      const fetchAd = async () => {
        try {
          const response = await api.get(`/client-ads/${adId}/`);
          const adData = response.data;
          setSubcategory(adData.subcategory);
          setCategory(adData.category);
          setDescription(adData.text);
          setMinPrice(adData.min_price);
          setMaxPrice(adData.max_price);
          setDuration(adData.time);
          setPhone(adData.phone || ""); // Optional phone
        } catch (error) {
          console.error("Error fetching ad:", error);
        }
      };
      fetchAd();
    }
  }, [adId]);

  const validateForm = () => {
    if (!description.trim()) {
      alert("Dodaj opis.");
      return false;
    }
    if (!subcategory.id) {
      alert("Wybierz podkategorię.");
      return false;
    }
    if (minPrice === null || maxPrice === null || minPrice > maxPrice) {
      alert("Podaj poprawny przedział cenowy.");
      return false;
    }
    if (!duration || duration <= 0) {
      alert("Podaj poprawny czas trwania.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    const adData = {
      sub_category: subcategory.id,
      text: description,
      min_price: minPrice,
      max_price: maxPrice,
      time: duration,
      phone,
    };

    try {
      if (adId) {
        //UPDATE
        await protectedApi.put(`/client-ads/${adId}/`, adData);
        alert("Ogłoszenie zostało zaktualizowane.");
        setRefreshAds(!refreshAds);
      } else {
        //CREATE
        await protectedApi.post(`/client-ads/`, adData);
        alert("Ogłoszenie zostało utworzone.");
        setSelectedFunc("Moje ogłoszenia");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error submitting ad:", error);
      alert("Wystąpił błąd podczas zapisywania ogłoszenia.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="row">
      <h1 className="title text-center">
        {adId ? "Edytuj" : "Dodaj"} ogłoszenie
      </h1>
      <div className="form-row-2">
        <div className="form-col-2">
          {adId ? (
            <SelectSubCategory
              subcategory={subcategory}
              setSubcategory={setSubcategory}
              selectedCategory={category}
            />
          ) : (
            <SelectSubCategory
              subcategory={subcategory}
              setSubcategory={setSubcategory}
            />
          )}
        </div>

        <div className="form-col-2">
          <div className="col-center">
            <h3 className="subtitle">Przedział cenowy</h3>
            <div className="row-small-space">
              <div className="form-col-2 mr-2">
                <label htmlFor="minPrice">Min. cena</label>
                <input
                  id="minPrice"
                  className="form-input"
                  type="number"
                  value={minPrice || ""}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
              </div>
              <div className="form-col-2">
                <label htmlFor="maxPrice">Maks. cena</label>
                <input
                  id="maxPrice"
                  className="form-input"
                  type="number"
                  value={maxPrice || ""}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-row-2">
        <div className="form-row-2" style={{ marginBottom: 0 }}>
          <div className="form-col-2 mr-2">
            <label htmlFor="duration">Czas (Minuty)</label>
            <input
              id="duration"
              className="form-input"
              type="number"
              value={duration || ""}
              onChange={(e) => setDuration(Number(e.target.value))}
            />
          </div>
          <div className="form-col-2">
            <label htmlFor="phone">Nr tel (opcjonalnie)</label>
            <input
              id="phone"
              className="form-input"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="form-col-2">
          <label htmlFor="description">Opis</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="row-center mt-2">
        <button
          type="button"
          className="btn btn-dark"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          <AdIcon />
          <p>
            {isSubmitting
              ? adId
                ? "Zapisywanie..."
                : "Tworzenie..."
              : adId
              ? "Zapisz zmiany"
              : "Utwórz ogłoszenie"}
          </p>
        </button>
      </div>
    </div>
  );
};

export default ClientAdForm;
