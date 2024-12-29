import { FC, useState } from "react";
import SelectSubCategory from "../../Reusable/SelectSubCategory";
import { Service } from "../types/ads-types";
import ServiceForm from "./ServiceForm";
import ServiceList from "./ServiceList";
import { AdIcon } from "../../../assets/icons/icons";
import { protectedApi } from "../../../api/axiosClient";
import { Category } from "../../HomePage/types";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../../Profile/context/profile-context";

const TrainerAdForm: FC<{}> = () => {
  const [subcategory, setSubcategory] = useState<Category>({
    id: 0,
    name: "",
  });
  const [description, setDescription] = useState<string>("");
  const [services, setServices] = useState<Service[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();
  const { setSelectedFunc } = useProfileContext();

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

      // Send request to create the ad
      const response = await protectedApi.post("/ads/", adData);

      // Show success feedback or perform navigation
      alert("Pomyślnie utworzono ogłoszenie.");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("", error);
      alert("Błąd podczas tworzenia ogłoszenia.");
    } finally {
      setIsSubmitting(false);
      setSelectedFunc("Moje ogłoszenia");
      navigate("/profile");
    }
  };

  return (
    <div className="row">
      <h1 className="title text-center">Dodaj ogłoszenie</h1>

      <div className="form-row-2">
        <div className="form-col-2">
          <SelectSubCategory
            subcategory={subcategory}
            setSubcategory={setSubcategory}
          />
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
          <p>{isSubmitting ? "Tworzenie..." : "Utwórz ogłoszenie"}</p>
        </button>
      </div>
    </div>
  );
};

export default TrainerAdForm;
