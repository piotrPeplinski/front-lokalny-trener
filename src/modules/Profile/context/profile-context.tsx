import { createContext, FC, ReactNode, useContext, useState } from "react";

interface ProfileContextType {
  refreshEducationList: boolean;
  setRefreshEducationList: Function;
  refreshPhotos: boolean;
  setRefreshPhotos: Function;
  refreshAds: boolean;
  setRefreshAds: Function;
  selectedFunc: string;
  setSelectedFunc: Function;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

const ProfileProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [refreshEducationList, setRefreshEducationList] = useState(false);
  const [refreshPhotos, setRefreshPhotos] = useState(false);
  const [refreshAds, setRefreshAds] = useState(false);
  const [selectedFunc, setSelectedFunc] = useState("O mnie");

  return (
    <ProfileContext.Provider
      value={{
        refreshEducationList,
        setRefreshEducationList,
        refreshPhotos,
        setRefreshPhotos,
        refreshAds,
        setRefreshAds,
        selectedFunc,
        setSelectedFunc,
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
