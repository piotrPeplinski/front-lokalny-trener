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
        href: "/profile",
        text: "Mój profil",
        classes: "shift",
      },
      {
        href: "/add",
        text: "Dodaj ogłoszenie",
        classes: "shift",
      },
    ];
  }
  return links;
};

export { getNavbarData };
