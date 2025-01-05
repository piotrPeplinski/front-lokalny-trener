import { FC, useEffect, useState } from "react";
import { api } from "../../../api/axiosClient";
import { useAuthContext } from "../../Auth/context/auth-context";
import CardEducation from "./CardEducation";
import { Education } from "../types/profile-types";
import { useProfileContext } from "../context/profile-context";

interface ListEducationProps {
  allowEdit: boolean;
  fetchedEducation?: Education[];
}

const ListEducation: FC<ListEducationProps> = ({
  allowEdit,
  fetchedEducation,
}) => {
  const { user } = useAuthContext();
  const { refreshEducationList } = useProfileContext();
  const [educationList, setEducationList] = useState<Education[]>([]);

  useEffect(() => {
    if (fetchedEducation) {
      setEducationList(fetchedEducation);
    } else {
      const fetchEducation = async () => {
        try {
          const response = await api.get(`accounts/education/`, {
            params: {
              user: user?.id,
            },
          });
          setEducationList(response.data);
        } catch (error) {
          console.error("Error fetching education data:", error);
        }
      };
      fetchEducation();
    }
  }, [user?.id, refreshEducationList, fetchedEducation]);

  return (
    <>
      {educationList.length !== 0 && (
        <div className="education-list shadow">
          <h2>Wykształcenie</h2>
          {educationList.map((education) => (
            <CardEducation
              key={education.id}
              education={education}
              allowEdit={allowEdit}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ListEducation;
