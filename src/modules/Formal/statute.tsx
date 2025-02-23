import { FC } from "react";

const Statute: FC<{}> = () => {
  return (
    <section>
      <div className="row">
        <h2>REGULAMIN SERWISU LOKALNYTRENER.PL</h2>
        <p>
          1. Definicje
          <br />- <strong>Serwis</strong> – platforma internetowa
          Lokalnytrener.pl,
          <br />- <strong>Użytkownik</strong> – osoba korzystająca z Serwisu,
          <br />- <strong>Trener</strong> – osoba oferująca swoje usługi za
          pośrednictwem Serwisu,
          <br />- <strong>Administrator</strong> – właściciel i operator
          Serwisu.
        </p>
        <p>
          2. Zakres Usług
          <br />
          Serwis Lokalnytrener.pl umożliwia Użytkownikom znalezienie i
          rezerwację usług treningowych oraz publikowanie ogłoszeń przez
          Trenerów.
        </p>
        <p>
          3. Warunki Korzystania z Serwisu
          <br />
          - Użytkownik zobowiązany jest do podania prawdziwych danych podczas
          rejestracji,
          <br />
          - Zabronione jest publikowanie treści niezgodnych z prawem,
          <br />- Administrator ma prawo do usunięcia konta naruszającego
          regulamin.
        </p>
        <p>
          4. Płatności
          <br />
          - Korzystanie z niektórych funkcji Serwisu może być płatne,
          <br />- Płatności realizowane są za pośrednictwem operatora płatności.
        </p>
        <p>
          5. Odpowiedzialność
          <br />
          - Administrator nie ponosi odpowiedzialności za jakość usług
          oferowanych przez Trenerów,
          <br />- Użytkownicy ponoszą pełną odpowiedzialność za treści
          publikowane w Serwisie.
        </p>
        <p>
          6. Postanowienia Końcowe
          <br />
          - Administrator zastrzega sobie prawo do zmiany Regulaminu i Polityki
          Prywatności,
          <br />- Wszelkie spory będą rozstrzygane przez sąd właściwy dla
          siedziby Administratora.
        </p>
      </div>
    </section>
  );
};

export default Statute;
