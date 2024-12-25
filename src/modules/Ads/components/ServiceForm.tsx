import { FC, useState } from "react";
import { Service } from "../types/ads-types";

interface ServiceFormProps {
  services: Service[];
  setServices: Function;
}

const ServiceForm: FC<ServiceFormProps> = ({ services, setServices }) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [time, setTime] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validate inputs
    if (!name || price === "" || time === "") {
      alert("Please fill out all fields!");
      return;
    }

    // Create a new service object
    const newService: Service = {
      name,
      price: Number(price),
      time: Number(time),
    };

    // Update the services state
    setServices([...services, newService]);

    // Clear the form fields
    setName("");
    setPrice("");
    setTime("");
  };

  return (
    <>
      <h3 className="subtitle text-center mt-2">Jakie usługi oferujesz?</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row-2">
          <div className="form-col-2">
            <label htmlFor="name">Nazwa</label>
            <input
              type="text"
              required
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row-2">
          <div className="form-col-2">
            <label htmlFor="price">Cena (PLN)</label>
            <input
              type="number"
              required
              className="form-input"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value) || "")}
            />
          </div>
          <div className="form-col-2">
            <label htmlFor="time">Czas (Minuty)</label>
            <input
              type="number"
              required
              className="form-input"
              value={time}
              onChange={(e) => setTime(Number(e.target.value) || "")}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-dark">
          Dodaj usługę
        </button>
      </form>
    </>
  );
};

export default ServiceForm;
