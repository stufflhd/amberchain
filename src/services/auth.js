export const loginUser = async (credentials) => {
  const res = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/public/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  let response;
  try {
    response = await res.json();
  } catch (err) {
    response = { message: err };
  }
  if (!res.ok) {
    throw new Error(response.message);
  }

  return response;
};

export const registerUser = async (userData) => {
  const res = await fetch(`${import.meta.env.VITE_APP_DOMAIN}/public/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const response = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (response.errors && Array.isArray(response.errors)) {
      const error = new Error(JSON.stringify(response));
      error.isValidationError = true;
      throw error;
    }
    const error = new Error("REGISTRATION_FAILED");
    error.isRegistrationError = true;
    throw error;
  }
  return response;
};
