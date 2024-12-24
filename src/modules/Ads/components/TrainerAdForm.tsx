import { FC, useState } from "react";
import SelectSubCategory from "../../Reusable/SelectSubCategory";
import { Service } from "../types/ads-types";
import ServiceForm from "./ServiceForm";
import ServiceList from "./ServiceList";

const TrainerAdForm: FC<{}> = () => {
  const [subcategory, setSubcategory] = useState(null);
  const [services, setServices] = useState<Service[]>([]);

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
          <textarea name="" id="desc"></textarea>
        </div>
      </div>
      <div className="row-2">
        <div className="col-2">
          <ServiceForm services={services} setServices={setServices} />
        </div>
        <div className="col-2">
          <ServiceList />
        </div>
      </div>
    </div>
  );
};

export default TrainerAdForm;
