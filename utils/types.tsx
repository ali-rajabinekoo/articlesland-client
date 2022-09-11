import {Authentication} from "./apis/authentication";
import {Article} from "./apis/article";
import {Category} from "./apis/category";
import {User} from "./apis/user";

// DTOs

export class UserDto {
    id: number | undefined | null
    username: string | undefined | null
    displayName?: string | undefined | null
    phoneNumber: string | undefined | null
    email?: string | undefined | null
    avatar?: string | undefined | null
    bio?: string | undefined | null
    created_at: string | undefined | null
    updated_at: string | undefined | null
    articles?: ArticleDto[] | undefined | null
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

export class GetArticleResponseDto extends ArticleDto{
    body: string | undefined | null;
}

export class NotificationDto {
    user: UserDto | undefined | null;
    type: 'liked' | 'comment' | 'followed' | string | undefined | null;
    message?: string | undefined | null;
    created_at: string | undefined | null;
}

// hooks

export class UseUserInfoResult {
    userInfo!: UserDto | null
    accessToken!: string
    setNewAccessToken!: Function
    setNewUser!: Function
    getAccessToken!: Function
    logout!: Function
}

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

// inputs

export class SelectInputItem {
    value!: string | number
    label!: string
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

export class APIS {
    auth!: Authentication
    article!: Article
    category!: Category
    user!: User
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

// styles

export class ReadArticleBannerProps {
    src?: string | undefined
}
