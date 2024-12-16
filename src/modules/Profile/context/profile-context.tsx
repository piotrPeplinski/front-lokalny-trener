import { createContext, FC, ReactNode, useContext, useState } from "react";

interface ProfileContextType {
  editPopupOpen: boolean;
  setEditPopupOpen: Function;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

const ProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [editPopupOpen, setEditPopupOpen] = useState(false);

  return (
    <ProfileContext.Provider
      value={{
        editPopupOpen,
        setEditPopupOpen,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used with ProfileProvider");
  }
  return context;
};

export { ProfileProvider, useProfileContext };
