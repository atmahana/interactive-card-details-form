import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface FormState {
  formData: Record<string, any>;
  isSucceed?: boolean;
}

export const actionType = {
  UPDATE: "UPDATE_FORM_DATA",
  SUBMIT: "SUBMIT_FORM_DATA",
  RESET: "RESET_FORM_DATA",
};

interface FormAction {
  type?: string;
  payload?: Record<string, any>;
  isSucceed?: boolean;
}

type FormDispatch = (action: FormAction) => void;

const initialState: FormState = {
  formData: {},
  isSucceed: false,
};

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case actionType.UPDATE:
      return {
        ...state,
        formData: { ...state.formData, ...(action.payload || {}) },
      };
    case actionType.SUBMIT:
      return {
        ...state,
        formData: { ...state.formData, ...(action.payload || {}) },
        isSucceed: action.isSucceed,
      };
    case actionType.RESET:
      return {
        formData: {},
        isSucceed: false,
      };
    default:
      return state;
  }
};

const FormContext = createContext<
  | {
      state: FormState;
      updateFormData: FormDispatch;
      submitFormData: FormDispatch;
      resetFormData: FormDispatch;
    }
  | undefined
>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const updateFormData: FormDispatch = (data) => {
    dispatch({ type: actionType.UPDATE, payload: data.payload });
  };

  const submitFormData: FormDispatch = (data) => {
    dispatch({
      type: actionType.SUBMIT,
      payload: data.payload,
      isSucceed: data.isSucceed,
    });
  };

  const resetFormData: FormDispatch = (data) => {
    dispatch({
      type: actionType.RESET,
      payload: data.payload,
      isSucceed: data.isSucceed,
    });
  };

  return (
    <FormContext.Provider
      value={{ state, updateFormData, submitFormData, resetFormData }}
    >
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
