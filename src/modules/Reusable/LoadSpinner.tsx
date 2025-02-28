import { FC } from "react";
import { ClipLoader } from "react-spinners";

const LoadSpinner: FC<{}> = () => {
  return (
    <div className="row-center">
      <ClipLoader color="#328abd" />
    </div>
  );
};

export default LoadSpinner;
