import { User } from "../../Auth/types/auth-types";

const getNavbarData = (user: User | null) => {
  let links;
  if (!user) {
    links = [
      {
        href: "#",
        text: "Czym jesteśmy",
        classes: "shift",
      },
      {
        href: "/login",
        text: "Zaloguj się",
        classes: "shift",
      },
      {
        href: "/register",
        text: "Zarejestruj się",
        classes: "shift important",
      },
    ];
  } else {
    links = [
      {
        href: "#",
        text: "Mój profil",
        classes: "shift",
      },
      {
        href: "#",
        text: "Dodaj ogłoszenie",
        classes: "shift important",
      },
    ];
  }
  return links;
};

export { getNavbarData };
