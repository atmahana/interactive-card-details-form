import { FC } from "react";
import CardLogo from "../../assets/card-logo.svg";
import { useFormContext } from "../../hooks/FormContext";

const FrontCard: FC = () => {
  const { state } = useFormContext();
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear().toString().slice(-2);

  return (
    <div className="bg-card-front bg-cover max-w-[286px] h-[157px] md:max-w-[447px] md:h-[245px] grid relative -top-8 md:-top-14 left-4 md:left-[10.25rem] text-white z-50">
      <div className="w-full px-5 pt-[18px] md:pt-7 md:px-8">
        <img src={CardLogo} className="w-[54px] md:w-[5.25rem]" />
      </div>
      <div className="w-full grid px-5 md:px-8 pb-3 items-center">
        <h1 className="tracking-widest md:tracking-[0.15em] text-lg md:text-[1.65rem] word-space-lg md:word-space-sm">
          {state.formData.cardNumber
            ? state.formData.cardNumber
            : "0000 0000 0000 0000"}
        </h1>
        <div className="flex justify-between w-full">
          <h2 className="text-xxs md:text-base uppercase tracking-wider">
            {state.formData.cardHolderName
              ? state.formData.cardHolderName
              : "Jean Appleseed"}
          </h2>
          <h3 className="text-xxs md:text-base tracking-tighter">
            {state.formData.expDate?.month
              ? state.formData.expDate.month
              : currentMonth + 1}{" "}
            /{" "}
            {state.formData.expDate?.year
              ? state.formData.expDate.year
              : currentYear}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FrontCard;
