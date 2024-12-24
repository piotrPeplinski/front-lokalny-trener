import { FC } from "react";
import { Service } from "../types/ads-types";

interface ServiceFormProps {
  services: Service[];
  setServices: Function;
}

const ServiceForm: FC<ServiceFormProps> = ({ services, setServices }) => {
  return (
    <>
      <h3 className="subtitle text-center mt-2">Jakie usługi oferujesz?</h3>
      <div className="form-row-2">
        <div className="form-col-2">
          <label htmlFor="name">Nazwa</label>
          <input type="text" className="form-input" />
        </div>
      </div>
      <div className="form-row-2">
        <div className="form-col-2">
          <label htmlFor="price">Cena (PLN)</label>
          <input type="number" className="form-input" />
        </div>
        <div className="form-col-2">
          <label htmlFor="time">Czas (Minuty)</label>
          <input type="number" className="form-input" />
        </div>
      </div>
      <button className="btn btn-dark">Dodaj usługę</button>
    </>
  );
};

export default ServiceForm;
