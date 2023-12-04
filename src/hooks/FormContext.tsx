import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface FormState {
  formData: Record<string, any>;
  isSucceed?: boolean;
}

interface FormAction {
  type?: string;
  payload?: Record<string, any>;
  isSucceed?: boolean,
}

type FormDispatch = (action: FormAction) => void;

const initialState: FormState = {
  formData: {},
  isSucceed: false,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "UPDATE_FORM_DATA":
      return {
        ...state,
        formData: { ...state.formData, ...(action.payload || {}) },
      };
    case "SUBMIT_FORM_DATA":
      return {
        ...state,
        formData: { ...state.formData, ...(action.payload || {}) },
        isSucceed: action.isSucceed,
      };
    default:
      return state;
  }
};

const FormContext = createContext<
  { state: FormState; updateFormData: FormDispatch, submitFormData: FormDispatch } | undefined
>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const updateFormData: FormDispatch = (data) => {
    dispatch({ type: "UPDATE_FORM_DATA", payload: data.payload });
  };

  const submitFormData: FormDispatch = (data) => {
    dispatch({ type: "SUBMIT_FORM_DATA", payload: data.payload, isSucceed: data.isSucceed });
  };

  return (
    <FormContext.Provider value={{ state, updateFormData, submitFormData}}>
      {children}
    </FormContext.Provider>
  );
};

const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export { FormProvider, useFormContext };
