import { t } from "i18next";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,}$/;
export const nameRegex = /^(?=.*[A-Za-z])[\sA-Za-z'.-]{2,}$/;
// Allow Unicode letters (both uppercase and lowercase, including accented letters) and digits.
// Use \p{L} to match any kind of letter; the `u` flag enables Unicode property escapes.
export const generalTextRegex = /^(?=.*[\p{L}\d])[\s\p{L}\d&@#',./()\-]{2,}$/u;
export const zipCodeRegex = /^[0-9]{5}(-[0-9]{4})?$/;
// Require phone numbers to start with a leading 0, then allow digits/spaces/hyphen/parentheses.
export const phoneRegex = /^0[\d\s\-()]{6,19}$/;

export const formFields = {
    firstName: {
        name: "firstName",
        label: () => t('registerForm.firstName'),
        type: "text",
        required: true,
        regex: nameRegex,
        validation: (value) => !value.trim() || !nameRegex.test(value) ? t('validation.invalidFirstName') : null
    },
    lastName: {
        name: "lastName",
        label: () => t('registerForm.lastName'),
        type: "text",
        required: true,
        regex: nameRegex,
        validation: (value) => !value.trim() || !nameRegex.test(value) ? t('validation.invalidLastName') : null
    },
    email: {
        name: "email",
        label: () => t('registerForm.email'),
        type: "email",
        required: true,
        regex: emailRegex,
        validation: (value) => !value.trim() || !emailRegex.test(value) ? t('validation.invalidEmail') : null
    },
    // Note: emailConfirmation removed from DTO; keep validation elsewhere if needed
    password: {
        name: "password",
        label: () => t('registerForm.password'),
        type: "password",
        required: true,
        regex: passwordRegex,
        validation: (value) => !value.trim() || !passwordRegex.test(value) ? t('validation.weakPassword') : null
    },
    gsm: {
        name: "gsm",
        label: () => t('registerForm.phoneNumber'),
        type: "tel",
        required: true,
        regex: phoneRegex,
        validation: (value) => !value.trim() || !phoneRegex.test(value) ? t('validation.invalidPhone') : null
    },

    companyName: {
        name: "companyName",
        label: () => t('registerForm.companyName'),
        type: "text",
        required: true,
        regex: generalTextRegex,
        validation: (value) => !value.trim() || !generalTextRegex.test(value) ? t('validation.invalidCompanyName') : null
    },
    country: {
        name: "country",
        label: () => t('registerForm.country'),
        type: "text",
        required: true,
        validation: (value) => !value.trim() ? t('validation.required') : null
    },
    address: {
        name: "address",
        label: () => t('registerForm.address'),
        type: "text",
        required: true,
        regex: generalTextRegex,
        validation: (value) => !value.trim() || !generalTextRegex.test(value) ? t('validation.invalidAddress') : null
    },
    zipCode: {
        name: "zipCode",
        label: () => t('registerForm.zipCode'),
        type: "text",
        required: true,
        regex: zipCodeRegex,
        validation: (value) => !value.trim() || !zipCodeRegex.test(value) ? t('validation.invalidZipCode') : null
    },
};

export const loginFields = [
    formFields.email,
    formFields.password
];

export const userInfoStepFields = [
    formFields.firstName,
    formFields.lastName,
    formFields.email,
    formFields.password,
    formFields.gsm
];

export const companyInfoStepFields = [
    formFields.companyName,
    formFields.country,
    formFields.address,
    formFields.zipCode
];
