import { FC } from "react";
import { useFormContext } from "../../hooks/FormContext";

const BackCard: FC = () => {
  const { state } = useFormContext();
  return (
    <div className="bg-card-back bg-cover max-w-[286px] h-[157px] md:max-w-[447px] md:h-[245px] relative z-40 w-full md:w-[447px] top-8 md:top-[52%] left-[4.55rem] md:left-64">
      <p className="absolute right-8 bottom-[4.5rem] md:right-14 md:bottom-28 text-xs md:text-base text-white">
        {state.formData.cvc ? state.formData.cvc : "000"}
      </p>
    </div>
  );
};

export default BackCard;
