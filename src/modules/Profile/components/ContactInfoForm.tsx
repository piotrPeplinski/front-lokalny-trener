import { FC } from "react";

const ContactInfoForm: FC<{}> = () => {
  return (
    <form>
      <div className="form-row-2">
        <div className="form-col-2">
          <label htmlFor="phone">Numer telefonu</label>
          <input
            className="form-input"
            type="tel"
            id="phone"
            pattern="\d{9}"
            title="Podaj prawidłowy numer telefonu składający się z 9 cyfr"
          />
        </div>
      </div>
      <div className="form-row-2">
        <div className="form-col-2">
          <label htmlFor="fb">Facebook (link)</label>
          <input className="form-input" type="url" id="fb" />
        </div>
        <div className="form-col-2">
          <label htmlFor="insta">Instagram (link)</label>
          <input className="form-input" type="url" id="insta" />
        </div>
      </div>
      <div className="form-row-2">
        <div className="form-col-2">
          <label htmlFor="tik">Tiktok (link)</label>
          <input className="form-input" type="url" id="tik" />
        </div>
        <div className="form-col-2">
          <label htmlFor="web">Strona internetowa (link)</label>
          <input className="form-input" type="url" id="web" />
        </div>
      </div>
      <button className="btn btn-dark" type="submit">
        Zapisz zmiany
      </button>
    </form>
  );
};

export default ContactInfoForm;
