import { FC } from "react";

const FormEducation: FC<{}> = () => {
  return (
    <form>
      <div className="form-row-2">
        <div className="form-col-2">
          <label htmlFor="name">Nazwa</label>
          <input type="text" className="form-input" id="name" />
        </div>
      </div>
      <div className="form-row-2">
        <div className="form-col-2">
          <label htmlFor="date">Data uzyskania</label>
          <input type="date" className="form-input" id="date" />
        </div>
      </div>
      <div className="form-row-2">
        <div className="checkbox-col">
          <label htmlFor="in">W trakcie</label>
          <input className="form-input" type="checkbox" id="in" />
        </div>
      </div>
      <button className="btn btn-dark" type="submit">
        Dodaj
      </button>
    </form>
  );
};

export default FormEducation;
