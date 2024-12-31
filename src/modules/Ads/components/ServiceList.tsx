import { FC } from "react";
import { Service } from "../types/ads-types";
import { TrashIcon } from "../../../assets/icons/icons";

interface ServiceListProps {
  services?: Service[];
  setServices?: Function;
}

const ServiceList: FC<ServiceListProps> = ({ services, setServices }) => {
  const handleDelete = (index: number) => {
    if (setServices) {
      const updatedServices = services?.filter((_, i) => i !== index);
      setServices(updatedServices);
    }
  };

  return (
    <>
      {setServices && (
        <h3 className="subtitle text-center mt-2">Oferowane usługi</h3>
      )}
      <div className="services-list shadow">
        <div className="service-row">
          <p>Nazwa</p>
          <p>Cena (PLN)</p>
          <p>Czas (min)</p>
        </div>
        {services?.map((service, index) => (
          <div className="service-row" key={index}>
            {setServices && (
              <div
                className="delete-service"
                onClick={() => handleDelete(index)}
              >
                <TrashIcon />
              </div>
            )}
            <p>{service.name}</p>
            <p>{service.price}</p>
            <p>{service.time}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServiceList;
