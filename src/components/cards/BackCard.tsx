import { FC } from "react";
import { useFormContext } from "../../hooks/FormContext";

const BackCard: FC = () => {
  const { state } = useFormContext();
  return (
    <div className="absolute bg-card-back bg-cover min-w-[286px] min-h-[157px] max-w-[447px] max-h-[245px] z-40 grid justify-end items-center pr-8 pb-1 -translate-x-[40%] left-1/2 -translate-y-[56%] top-1/2 md:translate-x-0 md:-translate-y-[0%] xl:w-full xl:h-full xl:pr-14 xl:left-[53.5%] xl:top-[52.15%]">
      <p className="text-xs xl:text-base text-white">
        {state.formData.cvc ? state.formData.cvc : "000"}
      </p>
    </div>
  );
};

export default BackCard;
