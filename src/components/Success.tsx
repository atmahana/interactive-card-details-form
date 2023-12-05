import { FC } from "react";
import successIcon from "../assets/icon-complete.svg";
import { useFormContext, actionType } from "../hooks/FormContext";

interface SuccessProps {}

const Success: FC<SuccessProps> = () => {
  const { resetFormData } = useFormContext();

  return (
    <div className="flex flex-col items-center justify-center gap-9 py-4 px-6 text-center">
      <img src={successIcon} />
      <div className="grid gap-4">
        <h4 className="uppercase text-3xl tracking-widest text-dark-violet">
          Thank You
        </h4>
        <p className="text-lg text-light-violet">
          We've added your card details
        </p>
      </div>
      <button
        className="bg-dark-violet w-full py-4 rounded-lg mt-1.5 text-white"
        onClick={() =>
          resetFormData({ type: actionType.RESET, isSucceed: false })
        }
      >
        Continue
      </button>
    </div>
  );
};

export default Success;
