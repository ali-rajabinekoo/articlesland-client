import {Authentication} from "./apis/authentication";
import {Article} from "./apis/article";
import {Category} from "./apis/category";
import {User} from "./apis/user";
import {Draft} from "./apis/draft";
import {AxiosError} from "axios";

// DTOs

export class UserDto {
    id: number | undefined | null
    username: string | undefined | null
    displayName?: string | undefined | null
    phoneNumber: string | undefined | null
    refreshToken: string | undefined | null
    email?: string | undefined | null
    avatar?: string | undefined | null
    bio?: string | undefined | null
    created_at: string | undefined | null
    updated_at: string | undefined | null
    articles?: ArticleDto[] | undefined | null
    likes?: ArticleDto[] | undefined | null
    bookmarks?: ArticleDto[] | undefined | null
    selectedCategories?: CategoryDto[] | undefined | null
}

export class CategoryDto {
    id: number | undefined | null
    title: string | undefined | null
    displayTitle: string | undefined | null;
    avatar: string | undefined | null;
    articles: ArticleDto[] | undefined | null;
}

export class ArticleDto {
    id: number | undefined | null
    title: string | undefined | null;
    description: string | undefined | null;
    bodyUrl: string | undefined | null;
    bannerUrl: string | undefined | null;
    published: boolean | undefined | null;
    viewed: number | undefined | null;
    created_at: string | undefined | null;
    updated_at: string | undefined | null;
    owner: UserDto | undefined | null;
    category: CategoryDto | undefined | null;
    // reports: Relation<Report[]>;
    // likes: Relation<Like[]>;
    // bookmarks: Relation<Bookmark[]>;
    // comments: Relation<Comment[]>;
}

export class GetArticleResponseDto extends ArticleDto {
    body: string | undefined | null;
}

export class NotificationDto {
    user: UserDto | undefined | null;
    type: 'liked' | 'comment' | 'followed' | string | undefined | null;
    message?: string | undefined | null;
    created_at: string | undefined | null;
}

export class DraftResponseDto {
    id?: string | undefined | null;
    body?: string | undefined | null;
    title?: string | undefined | null;
    userId?: number | undefined | null;
    createdAt?: string | undefined | null;
    description?: string | undefined | null;
    articleId?: number | undefined | null;
}

// hooks

export class UseUserInfoResult {
    userInfo!: UserDto | null
    accessToken!: string
    refreshToken!: string
}

// export class UseUserInfoResult{
//     userInfo!: UserDto | null
//     accessToken!: string
//     refreshToken!: string
//     getUserInfo!: () => UserDto;
//     getAccessToken!: () => string;
//     getRefreshToken!: () => string;
//     setNewUser!: (user: UserDto) => void;
//     setAccessToken!: (access_token: string) => void;
//     setRefreshToken!: (refresh_token: string) => void;
//     logout!: () => void;
// }

export class UseRequestResult {
    getApis!: Function
}

export class UseArticlesLandEditorDirectionResult {
    init!: Function
    check!: Function
    direction!: 'rtl' | 'ltr'
}

export class UseFetchCategoriesResult {
    categories!: SelectInputItem[]
}

export class UseFetchSelectedCategoriesResult {
    selectedCategories!: CategoryDto[]
    error?: AxiosError | true | null | undefined
}

// components

export interface userStorageInterface {
    getUserInfo: () => UserDto;
    getAccessToken: () => string;
    getRefreshToken: () => string;
    setNewUser: (user: UserDto) => void;
    setAccessToken: (access_token: string) => void;
    setRefreshToken: (refresh_token: string) => void;
    logout: () => void;
}

export class SelectInputItem {
    value!: string | number
    label!: string
}

export class CategoriesTab {
    displayValue!: string
    value!: string
}

export class LinkedItemDto {
    label!: string;
    href!: string;
    icon?: JSX.Element;
    value?: string;
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

export class SendEmailCodeValues {
    email!: string;
}

export class ProfileInfoFormValues {
    username?: string | undefined;
    displayName?: string | undefined;
    bio?: string | undefined;
    password?: string | undefined;
    repeatPassword?: string | undefined;
}

// apis

export interface APIS {
    auth: Authentication
    article: Article
    category: Category
    user: User
    draft: Draft
}

export class PublicAPIS {
    auth!: Authentication
    category!: Category
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

export class PureVerificationBody {
    code: string | undefined
}

export class UserAndTokenResponse {
    user: object | undefined
    token: string | undefined
}

// APIS body

export class CreateArticleValues {
    title!: string;
    body!: string;
}

export class SaveDraftValues {
    title?: string | undefined;
    body!: string;
}

export class SetSelectedCategories {
    list!: string[] | number[]
}

// styles

export class ReadArticleBannerProps {
    src?: string | undefined
}
