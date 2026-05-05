export const validateSignup = (form: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  const errors: any = {};

  if (!form.firstName.trim()) errors.firstName = "First name required";
  if (!form.lastName.trim()) errors.lastName = "Last name required";

  if (!form.email.includes("@")) {
    errors.email = "Enter valid email";
  }

  if (form.password.length < 6) {
    errors.password = "Minimum 6 characters";
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const validateLogin = (form: {
  email: string;
  password: string;
}) => {
  const errors: any = {};

  if (!form.email.includes("@")) {
    errors.email = "Enter valid email";
  }

  if (!form.password) {
    errors.password = "Password required";
  }

  return errors;
};


export const validatePreScreen = (form: {
  startDate: string;
  height: string;
  startWeight: string;
  targetHeight: string;
  targetWeight: string;
}) => {
  const errors: any = {};

  // Start date
  if (!form.startDate) {
    errors.startDate = "Start date required";
  }

  // Height
  const height = Number(form.height);
  if (!form.height) {
    errors.height = "Height required";
  } else if (height < 120 || height > 230) {
    errors.height = "Height must be between 120–230 cm";
  }

  // Start Weight
  const startWeight = Number(form.startWeight);
  if (!form.startWeight) {
    errors.startWeight = "Weight required";
  } else if (startWeight < 30 || startWeight > 250) {
    errors.startWeight = "Weight must be between 30–250 kg";
  }

  // Target Height
  const targetHeight = Number(form.targetHeight);
  if (targetHeight && (targetHeight < 120 || targetHeight > 230)) {
    errors.targetHeight = "Height must be between 120–230 cm";
  }

  // Target Weight
  const targetWeight = Number(form.targetWeight);
  if (targetWeight && (targetWeight < 30 || targetWeight > 250)) {
    errors.targetWeight = "Weight must be between 30–250 kg";
  }

  return errors;
};