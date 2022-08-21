import React from "react";
import type {NextPage} from 'next'
import {AuthLayout} from "../../container/layout/authLayout";
import {RegistrationForm, RegistrationFormTitle} from "../../container/registration";

const Registration: NextPage = () => {
    return (<AuthLayout title={
        <RegistrationFormTitle/>
    }>
        <RegistrationForm/>
    </AuthLayout>)
}

export default Registration