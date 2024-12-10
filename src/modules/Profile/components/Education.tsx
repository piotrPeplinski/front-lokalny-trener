import { FC } from "react";
import { useAuthContext } from "../../Auth/context/auth-context";
import ListEducation from "./ListEducation";
import FormEducation from "./FormEducation";

const Education: FC<{}> = () => {
  const { user } = useAuthContext();

  return (
    <div className="me-container">
      <h1 className="profile-func-title">Wykształcenie / kursy / szkolenia</h1>
      <div className="education-container">
        <div className="form-col">
          <FormEducation />
        </div>
        <div className="education-list-col">
          <ListEducation allowEdit={true} />
        </div>
      </div>
    </div>
  );
};

export default Education;
