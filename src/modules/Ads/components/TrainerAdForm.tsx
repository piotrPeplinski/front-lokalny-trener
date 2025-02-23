import { FC, useEffect, useState } from "react";
import SelectSubCategory from "../../Reusable/SelectSubCategory";
import { Service } from "../types/ads-types";
import ServiceForm from "./ServiceForm";
import ServiceList from "./ServiceList";
import { AdIcon } from "../../../assets/icons/icons";
import { api, protectedApi } from "../../../api/axiosClient";
import { Category } from "../../HomePage/types";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../../Profile/context/profile-context";
import { getErrorMessage } from "../../Reusable/utils";

interface TrainerAdFormProps {
  adId?: number;
}

const TrainerAdForm: FC<TrainerAdFormProps> = ({ adId }) => {
  const { setRefreshAds, refreshAds } = useProfileContext();

  const [category, setCategory] = useState<Category>({
    id: 0,
    name: "",
  });
  const [subcategory, setSubcategory] = useState<Category>({
    id: 0,
    name: "",
  });
  const [description, setDescription] = useState<string>("");
  const [services, setServices] = useState<Service[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();
  const { setSelectedFunc } = useProfileContext();

  useEffect(() => {
    if (adId) {
      const fetchAd = async () => {
        try {
          const response = await api.get(`/ads/${adId}`);
          setSubcategory(response.data.subcategory);
          setCategory(response.data.category);
          setDescription(response.data.text);
          setServices(response.data.services);
        } catch (error: any) {
          const message = getErrorMessage(
            error,
            "Błąd podczas pobierania ogłoszenia."
          );
          alert(message);
        }
      };
      fetchAd();
    }
  }, [adId]);

  const handleSubmit = async () => {
    // Validate description
    if (!description.trim()) {
      alert("Dodaj opis.");
      return;
    }

    // Validate services
    if (services.length === 0) {
      alert("Dodaj minimum jedną usługę.");
      return;
    }

    if (subcategory.name === "") {
      alert("Wybierz podkategorię.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare payload for the API
      const adData = {
        text: description,
        sub_category: subcategory.id,
        services,
      };
      if (adId) {
        const response = await protectedApi.put(`/ads/${adId}/`, adData);
        alert("Pomyślnie zaktualizowano ogłoszenie.");
      } else {
        // CREATE
        const response = await protectedApi.post("/ads/", adData);
        alert("Pomyślnie utworzono ogłoszenie.");
        setSelectedFunc("Moje ogłoszenia");
        navigate("/profile");
      }
      setRefreshAds(!refreshAds);
    } catch (error: any) {
      const message = getErrorMessage(
        error,
        "Błąd podczas tworzenia ogłoszenia."
      );
      alert(message);
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
          <label htmlFor="desc">Opis</label>
          <textarea
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="row-2">
        <div className="col-2">
          <ServiceForm services={services} setServices={setServices} />
        </div>
        <div className="col-2">
          {services.length > 0 && (
            <ServiceList services={services} setServices={setServices} />
          )}
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
          {adId ? (
            <p>{isSubmitting ? "Zapisywanie..." : "Zapisz zmiany"}</p>
          ) : (
            <p>{isSubmitting ? "Tworzenie..." : "Utwórz ogłoszenie"}</p>
          )}
        </button>
      </div>
    </div>
  );
};

export default TrainerAdForm;
