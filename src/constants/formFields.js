import { t } from "i18next";

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{8,}$/;
export const nameRegex = /^(?=.*[A-Za-z])[\sA-Za-z'.-]{2,}$/;
export const generalTextRegex = /^(?=.*[A-Za-z0-9])[\sA-Za-z0-9&@#',.\/()-]{2,}$/;
export const zipCodeRegex = /^[0-9]{5}(-[0-9]{4})?$/;
export const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const formFields = {
    // User Info Fields
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
    emailConfirmation: {
        name: "emailConfirmation",
        label: () => t('registerForm.emailConfirmation'),
        type: "email",
        required: true,
        validation: (value, formData) => value !== formData.email ? t('validation.emailMismatch') : null
    },
    password: {
        name: "password",
        label: () => t('registerForm.password'),
        type: "password",
        required: true,
        regex: passwordRegex,
        validation: (value) => !value.trim() || !passwordRegex.test(value) ? t('validation.weakPassword') : null
    },
    phoneNumber: {
        name: "phoneNumber",
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
    companyLocation: {
        name: "companyLocation",
        label: () => t('registerForm.companyLocation'),
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
    formFields.emailConfirmation,
    formFields.password,
    formFields.phoneNumber
];

export const companyInfoStepFields = [
    formFields.companyName,
    formFields.companyLocation,
    formFields.address,
    formFields.zipCode
];
