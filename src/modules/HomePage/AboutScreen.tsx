import { FC } from "react";
import "../../assets/css/HomePage/homePage.css";
import { CheckIcon } from "../../assets/icons/icons";

const AboutScreen: FC<{}> = () => {
  return (
    <section>
      <div className="about-row">
        <div className="about-container">
          <h1>Czym jesteśmy?</h1>

          <h2>
            Serwis internetowy LokalnyTrener.pl powstał z myślą o klientach
            szukających wsparcia w interesujących jego/jej kategoriach oraz dla
            ekspertów chcących ogłosić swoje oferty.
          </h2>
          <div className="mt-2"></div>
          <p>
            Klient dzięki systemowi filtrów ma możliwość{" "}
            <span className="bold">dopasowania idealnego eksperta</span> pod
            swoje preferencje oraz napisania indywidualnego ogłoszenia z prośbą
            o pomoc wykorzystując dostępne filtry:
          </p>
          <div className="pricing-card__benefits">
            <div className="pricing-card__benefit">
              <div>
                <CheckIcon />
              </div>
              <p>Kategoria zajęć</p>
            </div>
            <div className="pricing-card__benefit">
              <div>
                <CheckIcon />
              </div>
              <p>Lokalizacja zajęć</p>
            </div>
            <div className="pricing-card__benefit">
              <div>
                <CheckIcon />
              </div>
              <p>Cena zajęć</p>
            </div>
            <div className="pricing-card__benefit">
              <div>
                <CheckIcon />
              </div>
              <p>Termin zajęć</p>
            </div>
          </div>
          <p>
            Ekspert jako potwierdzona i zarejestrowana osoba ma możliwość{" "}
            <span className="bold">dodawania swoich ogłoszeń</span> oraz posiada
            wgląd do ogłoszeń klientów szukających pomocy, tak aby bezpośrednio
            nawiązać kontakt i współpracę. Serwis internetowy{" "}
            <span className="bold">
              LokalnyTrener.pl jest w 100% darmowym i bezpiecznym miejscem
            </span>{" "}
            dla klientów szukających pomocy i nie pobiera opłat za odbyte
            zajęcia.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutScreen;
