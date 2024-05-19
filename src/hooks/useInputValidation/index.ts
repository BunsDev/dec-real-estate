import { useEffect, useState } from "react";
import { InputValidaitionHook, InputValidationHookReturn } from "./types";

export const useInputValidation = (
  rules: InputValidaitionHook[]
): InputValidationHookReturn => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isTouched, setIsTouched] = useState(false);

  const validate = () => {
    setIsValid(true);
    setErrorMessage("");
    rules.forEach((rule) => {
      if (!rule.rule.test(value)) {
        setIsValid(false);
        setErrorMessage(rule.errorMessage);
      }
    });
  };

  useEffect(() => {
    setIsValid(true);
    setErrorMessage("");
    if (!isTouched) {
      setIsTouched(true);
      return;
    }
    rules.forEach((rule) => {
      if (!rule.rule.test(value)) {
        setIsValid(false);
        setErrorMessage(rule.errorMessage);
      }
    });
  }, [value]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return { value, errorMessage, isValid, onChange, validate };
};
