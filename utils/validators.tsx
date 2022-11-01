import {ProfileInfoFormValues, SignupFormValues} from "./types";
import {validationMessages} from "./messages";
import * as Yup from 'yup';

export const SignupValidationSchema = Yup.object().shape({
    username: Yup.string()
        .min(4, validationMessages.length.usernameShort)
        .max(20, validationMessages.length.usernameLong)
        .matches(/^[a-zA-Z]*$/g, validationMessages.invalid.username)
        .required(validationMessages.empty.username),
    password: Yup.string()
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/g, validationMessages.invalid.password)
        .required(validationMessages.empty.password),
    repeatPassword: Yup.string()
        .required(validationMessages.empty.repeatPassword),
    phoneNumber: Yup.string()
        .matches(/^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/g, validationMessages.invalid.phoneNumber)
        .required(validationMessages.empty.phoneNumber),
});

export const signupValidationForm = (values: SignupFormValues) => {
    const errors: SignupFormValues = new SignupFormValues();

    if (!!values.password && values.repeatPassword !== values.password) {
        errors.repeatPassword = validationMessages.invalid.repeatPassword
    }

    return errors;
};

export const LoginValidationSchema = Yup.object().shape({
    username: Yup.string()
        .min(4, validationMessages.length.usernameShort)
        .max(20, validationMessages.length.usernameLong)
        .required(validationMessages.empty.username),
    password: Yup.string()
        .required(validationMessages.empty.password),
});

export const SendLoginCodeSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        .matches(/^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/g, validationMessages.invalid.phoneNumber)
        .required(validationMessages.empty.phoneNumber),
});

export const SendEmailCodeSchema = Yup.object().shape({
    email: Yup.string()
        .email(validationMessages.invalid.email),
});

export const profileInformationValidationForm = (values: ProfileInfoFormValues) => {
    const errors: ProfileInfoFormValues = new ProfileInfoFormValues();

    if (!!values.password && values.repeatPassword !== values.password) {
        errors.repeatPassword = validationMessages.invalid.repeatPassword
    }

    return errors;
};

export const ProfileInformationValidationSchema = Yup.object().shape({
    username: Yup.string()
        .min(4, validationMessages.length.usernameShort)
        .max(20, validationMessages.length.usernameLong),
    displayName: Yup.string()
        .min(4, validationMessages.length.displayNameShort)
        .max(50, validationMessages.length.displayNameLong),
    bio: Yup.string()
        .min(4, validationMessages.length.bioShort)
        .max(150, validationMessages.length.bioLong),
    password: Yup.string()
        .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})/g, validationMessages.invalid.password),
});
