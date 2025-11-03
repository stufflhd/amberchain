// src/services/auth.js
import apiClient from "@/lib/apiClient";

/**
 * LOGIN USER
 * @param {Object} payload - { username/email, password }
 * @returns {Object} - { token, user, ... }
 */
export const loginUser = async (payload) => {
  try {
    // Transform email to username if email is provided
    const loginPayload = {
      username: payload.username,
      password: payload.password
    };
    const { data } = await apiClient.post("/public/signin", loginPayload);
    return data;
  } catch (error) {
    const message =
      error.response?.data?.message || "Login failed. Please try again.";
    throw new Error(message);
  }
};

/**
 * REGISTER USER
 * @param {Object} userData - { email, password, firstName, lastName, ... }
 * @returns {Object} - { user, token, ... }
 */
export const registerUser = async (userData) => {
  try {
    const { data } = await apiClient.post("/public/signup", userData);
    console.debug('[auth] registerUser response:', data);
    return data;
  } catch (error) {
    // Log error details for easier debugging
    console.error('[auth] registerUser error:', error?.response?.status, error?.response?.data || error.message);
    if (error.response?.data?.errors) {
      // Backend validation errors
      const e = new Error(JSON.stringify(error.response.data.errors));
      e.isValidationError = true;
      throw e;
    }
    // If we flagged email-taken earlier, pass that through
  if (error.isEmailTakenError) throw error;

    // If server returned 409 or a message, surface it
    if (error.response?.status === 409) {
      const e = new Error('This email address is already registered.');
      e.isEmailTakenError = true;
      throw e;
    }

    const message = error.response?.data?.message || "Registration failed.";
    const e = new Error(message);
    e.isRegistrationError = true;
    throw e;
  }
};

/**
 * GET CONNECTED USER
 * Fetch the currently logged-in user
 * @returns {Object} - user object
 */
export const getConnectedUser = async () => {
  try {
    const { data } = await apiClient.get("/users");
    return data;
  } catch (error) {
    throw new Error("Failed to fetch connected user");
  }
};

/**
 * LOGOUT USER
 * Clears token and user from storage
 */
export const logoutUser = () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (err) {
    console.warn("Failed to clear local storage:", err);
  }
};
