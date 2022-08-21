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

export class SignupFormValues {
    username!: string;
    phoneNumber!: string;
    password!: string;
    repeatPassword!: string;
}
