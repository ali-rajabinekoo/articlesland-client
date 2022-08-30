import {Authentication} from "./apis/authentication";

// hooks

export class UserDto {
    id: number | undefined | null
    username: string | undefined | null
    phoneNumber: string | undefined | null
    email: string | undefined | null
    avatar: string | undefined | null
    bio: string | undefined | null
    displayName: string | undefined | null
    created_at: string | undefined | null
    updated_at: string | undefined | null
}

export class UseUserInfoResult {
    userInfo!: UserDto | null
    accessToken!: string
    setNewAccessToken!: Function
    setNewUser!: Function
}

export class UseRequestResult {
    getApis!: Function
}

// formik

export class SignupFormValues {
    username!: string;
    phoneNumber!: string;
    password!: string;
    repeatPassword!: string;
}

export class LoginFormValues {
    username!: string;
    password!: string;
}

export class SendLoginCodeValues {
    phoneNumber!: string;
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

export class VerificationResponse {
    key: string | undefined
}

export class VerificationBody {
    key: string | undefined
    code: string | undefined
}

export class UserAndTokenResponse {
    user: object | undefined
    token: string | undefined
}
