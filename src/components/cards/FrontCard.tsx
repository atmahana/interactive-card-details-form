import { FC } from "react";
import CardLogo from "../../assets/card-logo.svg";
import { useFormContext } from "../../hooks/FormContext";

const FrontCard: FC = () => {
  const { state } = useFormContext();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear().toString().slice(-2);

  return (
    <div className="absolute bg-card-front bg-cover min-w-[286px] min-h-[157px] max-w-[447px] max-h-[245px] z-40 grid text-white -translate-x-[60%] left-1/2 top-[52.5%] md:-translate-x-[25%] md:top-[30%] xl:w-full xl:h-full xl:-translate-x-[18%] xl:top-[20.75%]">
      <div className="w-full px-5 pt-[18px] xl:pt-7 xl:px-8">
        <img src={CardLogo} className="w-[54px] xl:w-[5.25rem]" />
      </div>
      <div className="w-full grid px-5 xl:px-8 pb-3 items-center">
        <h1 className="tracking-widest xl:tracking-[0.15em] text-lg xl:text-[1.65rem] word-space-lg xl:word-space-sm">
          {state.formData.cardNumber
            ? state.formData.cardNumber
            : "0000 0000 0000 0000"}
        </h1>
        <div className="flex justify-between w-full">
          <h2 className="text-xxs xl:text-base uppercase tracking-wider">
            {state.formData.cardHolderName
              ? state.formData.cardHolderName
              : "Jean Appleseed"}
          </h2>
          <h3 className="text-xxs xl:text-base tracking-tighter">
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
