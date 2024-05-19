export type InputValidaitionHook = {
  rule: RegExp;
  errorMessage: string;
};

export type InputValidationHookReturn = {
  value: string;
  errorMessage: string;
  isValid: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validate: () => void;
};
