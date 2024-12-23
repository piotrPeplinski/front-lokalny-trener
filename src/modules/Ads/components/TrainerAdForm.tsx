import { FC, useState } from "react";
import SelectSubCategory from "../../Reusable/SelectSubCategory";

const TrainerAdForm: FC<{}> = () => {
  const [subcategory, setSubcategory] = useState(null);

  return (
    <div className="row">
      <h1 className="title text-center">Dodaj ogłoszenie</h1>
      <SelectSubCategory
        subcategory={subcategory}
        setSubcategory={setSubcategory}
      />
    </div>
  );
};

export default TrainerAdForm;
