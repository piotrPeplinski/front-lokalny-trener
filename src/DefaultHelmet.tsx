import { Helmet } from "react-helmet";

const DefaultHelmet = () => {
  return (
    <Helmet>
      {/* Default meta tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Lokalny Trener" />
      <meta
        name="description"
        content="Łączymy osoby szukające pomocy z najlepszymi ekspertami! Fitness, języki, korepetycje, programowanie – dodaj ogłoszenie lub znajdź idealnego specjalistę. Dołącz do naszej społeczności już dziś!"
      />
      <meta
        name="keywords"
        content="lokalny, trener, fitness, język, korepetycje, programowanie, ogłoszenia"
      />
      <meta
        property="og:title"
        content="Front Lokalny Trener - Znajdź Lokalnych Ekspertów"
      />
      <meta
        property="og:description"
        content="Łączymy osoby szukające pomocy z najlepszymi ekspertami! Fitness, języki, korepetycje, programowanie – dodaj ogłoszenie lub znajdź idealnego specjalistę. Dołącz do naszej społeczności już dziś!"
      />
      <meta
        property="og:url"
        content={`${process.env.REACT_APP_FRONTEND_URL}`}
      />
      <link rel="canonical" href={`${process.env.REACT_APP_FRONTEND_URL}`} />
      <title>Lokalny Trener - Znajdź Lokalnych Ekspertów</title>
    </Helmet>
  );
};

export default DefaultHelmet;
