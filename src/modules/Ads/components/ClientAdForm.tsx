import { FC, useState } from "react";
import SelectSubCategory from "../../Reusable/SelectSubCategory";
import { Category } from "../../HomePage/types";
import { AdIcon } from "../../../assets/icons/icons";

const ClientAdForm: FC<{}> = () => {
  const adId = 0;
  const [category, setCategory] = useState<Category>({
    id: 0,
    name: "",
  });
  const [subcategory, setSubcategory] = useState<Category>({
    id: 0,
    name: "",
  });
  
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
                <label htmlFor="">Min. cena</label>
                <input className="form-input" type="number" />
              </div>
              <div className="form-col-2">
                <label htmlFor="">Maks. cena</label>
                <input className="form-input" type="number" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-row-2">
        <div className="form-row-2" style={{ marginBottom: 0 }}>
          <div className="form-col-2 mr-2">
            <label htmlFor="">Czas (Minuty)</label>
            <input className="form-input" type="number" />
          </div>
          <div className="form-col-2">
            <label htmlFor="">Nr tel (opcjonalnie)</label>
            <input className="form-input" type="text" />
          </div>
        </div>

        <div className="form-col-2">
          <label htmlFor="">Opis</label>
          <textarea name="" id=""></textarea>
        </div>
      </div>
      <div className="row-center mt-2">
        <button
          type="button"
          className="btn btn-dark"
          // onClick={handleSubmit}
          // disabled={isSubmitting}
        >
          <AdIcon />
          {/* {adId ? (
            <p>{isSubmitting ? "Zapisywanie..." : "Zapisz zmiany"}</p>
          ) : (
            <p>{isSubmitting ? "Tworzenie..." : "Utwórz ogłoszenie"}</p>
          )} */}
          <p>Utwórz ogłoszenie</p>
        </button>
      </div>
    </div>
  );
};

export default ClientAdForm;
