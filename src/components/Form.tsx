import { ChangeEvent, FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { formatCreditCard, formatDate, formatGeneral } from "cleave-zen";
import { useFormContext } from "../hooks/FormContext";

interface FormData {
  cardHolderName: string;
  cardNumber: string;
  expDate: {
    month: number;
    year: number;
  };
  cvc: number;
}

const InputFormGroup: FC = () => {
  const currentYear = new Date().getFullYear().toString().slice(-2);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    shouldFocusError: true,
    reValidateMode: "onChange",
  });

  const { updateFormData, submitFormData } = useFormContext();

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    submitFormData({ type: "UPDATE_FORM_DATA", payload: data, isSucceed: true });
  };

  return (
    <form
      className="flex flex-col gap-[1.15rem] md:gap-6 px-6 pt-4 md:justify-center"
      aria-label="card-details-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset
        className="grid gap-2"
        aria-label="card-holder-name-input-group"
      >
        <label
          htmlFor="cardHolderName"
          className="uppercase text-xs tracking-[0.16em]"
          aria-label="card-holder-name"
        >
          Cardholder Name
        </label>
        <input
          type="text"
          id="cardHolderName"
          placeholder="e.g. Jane AppleSeed"
          className={`border border-muted rounded-lg px-4 py-2.5 placeholder:tracking-wider focus:outline focus:outline-1 focus:outline-gradient-light ${
            errors?.cardHolderName ? "outline outline-1 outline-red-500" : null
          }`}
          maxLength={30}
          {...register("cardHolderName", {
            required: {
              value: true,
              message: "Can't be blank",
            },
            maxLength: 30,
            onChange: () =>
              updateFormData({
                type: "UPDATE_FORM_DATA",
                payload: {
                  cardHolderName: getValues("cardHolderName"),
                },
              }),
          })}
        />
        {errors?.cardHolderName ? (
          <span className="text-xs text-red-500">
            {errors?.cardHolderName.message}
          </span>
        ) : null}
      </fieldset>
      <fieldset className="grid gap-2">
        <label
          htmlFor="cardNumber"
          className="uppercase text-xs tracking-[0.16em]"
        >
          Card Number
        </label>
        <input
          type="string"
          id="cardNumber"
          placeholder="e.g. 1234 5678 9123 0000"
          className={`border border-muted rounded-lg px-4 py-2.5 placeholder:tracking-wider focus:outline focus:outline-1 focus:outline-gradient-light ${
            errors?.cardNumber ? "outline outline-1 outline-red-500" : null
          }`}
          maxLength={20}
          {...register("cardNumber", {
            required: {
              value: true,
              message: "Can't be blank",
            },
            maxLength: 20,
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
              setValue("cardNumber", formatCreditCard(e.target.value));
              updateFormData({
                type: "UPDATE_FORM_DATA",
                payload: {
                  cardNumber: getValues("cardNumber"),
                },
              });
            },
          })}
        />
        {errors?.cardNumber ? (
          <span className="text-xs text-red-500">
            {errors?.cardNumber.message}
          </span>
        ) : null}
      </fieldset>
      <div className="grid grid-flow-col grid-cols-2 gap-2">
        <fieldset className="flex flex-col gap-2">
          <label
            htmlFor="expDate"
            className="uppercase text-xs tracking-[0.16em]"
          >
            Exp. Date (MM/YY)
          </label>
          <div className="grid grid-flow-col grid-cols-2 gap-2">
            <input
              type="number"
              id="expDate"
              placeholder="MM"
              className={`border border-muted rounded-lg px-4 py-2.5 placeholder:tracking-wider focus:outline focus:outline-1 focus:outline-gradient-light ${
                errors?.expDate?.month
                  ? "outline outline-1 outline-red-500"
                  : null
              }`}
              {...register("expDate.month", {
                required: {
                  value: true,
                  message: "Can't be blank",
                },
                min: {
                  value: 1,
                  message: "Must be greater than 01",
                },
                max: {
                  value: 12,
                  message: "Can't be greater than 12",
                },
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  setValue(
                    "expDate.month",
                    +formatDate(e.target.value, {
                      datePattern: ["m"],
                    })
                  );
                  updateFormData({
                    type: "UPDATE_FORM_DATA",
                    payload: {
                      expDate: {
                        month: getValues("expDate.month"),
                      },
                    },
                  });
                },
              })}
            />
            <input
              type="number"
              id="expDate"
              placeholder="YY"
              className={`border border-muted rounded-lg px-4 py-2.5 placeholder:tracking-wider focus:outline focus:outline-1 focus:outline-gradient-light ${
                errors?.expDate?.year
                  ? "outline outline-1 outline-red-500"
                  : null
              }`}
              {...register("expDate.year", {
                required: {
                  value: true,
                  message: "Can't be blank",
                },
                min: {
                  value: +currentYear,
                  message: "Must be greater than or equal to current year",
                },
                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                  setValue(
                    "expDate.year",
                    +formatDate(e.target.value, {
                      datePattern: ["y"],
                    })
                  );
                  updateFormData({
                    type: "UPDATE_FORM_DATA",
                    payload: {
                      expDate: {
                        year: getValues("expDate.year"),
                      },
                    },
                  });
                },
              })}
            />
          </div>
          {errors?.expDate?.month || errors?.expDate?.year ? (
            <span className="text-xs text-red-500">
              {errors?.expDate.month?.message || errors?.expDate.year?.message}
            </span>
          ) : null}
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label
            htmlFor="cvc"
            className="uppercase text-xs tracking-[0.16em] w-10"
          >
            CVC
          </label>
          <input
            type="number"
            id="cvc"
            placeholder="e.g. 123"
            className={`border border-muted rounded-lg px-4 py-2.5 placeholder:tracking-wider focus:outline focus:outline-1 focus:outline-gradient-light w-full ${
              errors?.cvc ? "outline outline-1 outline-red-500" : null
            }`}
            {...register("cvc", {
              required: {
                value: true,
                message: "Can't be blank",
              },
              maxLength: {
                value: 3,
                message: "Max length is 3",
              },
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                setValue(
                  "cvc",
                  +formatGeneral(e.target.value, {
                    blocks: [3],
                  })
                );
                updateFormData({
                  type: "UPDATE_FORM_DATA",
                  payload: {
                    cvc: getValues("cvc"),
                  },
                });
              },
            })}
          />
          {errors?.cvc ? (
            <span className="text-xs text-red-500">{errors?.cvc?.message}</span>
          ) : null}
        </fieldset>
      </div>
      <button className="bg-dark-violet text-white rounded-lg py-3.5 mt-2">
        Confirm
      </button>
    </form>
  );
};

export default InputFormGroup;
