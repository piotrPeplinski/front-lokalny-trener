import { FC, useEffect, useState } from "react";
import { api } from "../../../api/axiosClient";
import { useAuthContext } from "../../Auth/context/auth-context";
import CardEducation from "./CardEducation";
import { Education } from "../types/profile-types";
import { useProfileContext } from "../context/profile-context";

interface ListEducationProps {
  allowEdit: boolean;
}

const ListEducation: FC<ListEducationProps> = ({ allowEdit }) => {
  const { user } = useAuthContext();
  const { refreshEducationList } = useProfileContext();
  const [educationList, setEducationList] = useState<Education[]>([]);
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await api.get(`accounts/education/`, {
          params: {
            user: user?.id,
          },
        });
        setEducationList(response.data);
        console.log(educationList);
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    };
    fetchEducation();
  }, [user?.id, refreshEducationList]);
  return (
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
  );
};

export default ListEducation;
