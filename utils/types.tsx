import {Authentication} from "./apis/authentication";

// hooks

export class UserDto {
    id: number | undefined | null
    username: string | undefined | null
    phoneNumber: string | undefined | null
    email: string | undefined | null
    avatar: string | undefined | null
    bio: string | undefined | null
    created_at: string | undefined | null
    updated_at: string | undefined | null
}

export class UseUserInfoResult {
    getUser!: Function
    getAccessToken!: Function
    setNewAccessToken!: Function
    setNewUser!: Function
}

export class UseRequestResult {
    getApis!: Function
}

export class UseTimer {
    minutes!: number | undefined
    seconds!: number | undefined
}

// formik

export class SignupFormValues {
    username!: string;
    phoneNumber!: string;
    password!: string;
    repeatPassword!: string;
}

// apis

export class APIS {
    auth!: Authentication
}

export class RequestParams {
    method!: string
    url!: string
    data?: object
    externalUrl?: boolean
}

export class SignUpResponse {
    key: string | undefined
}

export class VerificationBody {
    key: string | undefined
    code: string | undefined
}

export class VerificationResponse {
    user: object | undefined
    token: string | undefined
}
