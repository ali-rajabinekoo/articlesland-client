import {Authentication} from "./apis/authentication";
import {Article} from "./apis/article";
import {Category} from "./apis/category";
import {PublicUserApi, User} from "./apis/user";
import {Draft} from "./apis/draft";
import {AxiosError, AxiosResponse} from "axios";
import {Comment} from "./apis/comment";
import {Report} from "./apis/report";
import {Admin} from "./apis/admin";

// DTOs

export class UserDto {
    id: number | undefined | null;
    username: string | undefined | null;
    displayName?: string | undefined | null;
    phoneNumber: string | undefined | null;
    refreshToken: string | undefined | null;
    email?: string | undefined | null;
    avatar?: string | undefined | null;
    role: 'admin' | 'user' | undefined | null;
    bio?: string | undefined | null;
    isBlocked?: boolean | undefined | null;
    created_at: string | undefined | null;
    updated_at: string | undefined | null;
    articles?: ArticleDto[] | undefined | null;
    likes?: ArticleDto[] | undefined | null;
    bookmarks?: ArticleDto[] | undefined | null;
    selectedCategories?: CategoryDto[] | undefined | null;
    followers?: UserDto[] | undefined | null;
    followings?: UserDto[] | undefined | null;
    blockedUsers?: UserDto[] | undefined | null;
    notifications?: NotificationDto[] | undefined | null;
}

export class CategoryDto {
    id: number | undefined | null;
    title: string | undefined | null;
    displayTitle: string | undefined | null;
    avatar: string | undefined | null;
    articles: ArticleDto[] | undefined | null;
}

export class ArticleDto {
    id: number | undefined | null
    title: string | undefined | null;
    description: string | undefined | null;
    uid: string | undefined | null;
    bannerUrl: string | undefined | null;
    published: boolean | undefined | null;
    viewed: number | undefined | null;
    created_at: string | undefined | null;
    updated_at: string | undefined | null;
    owner: UserDto | undefined | null;
    category: CategoryDto | undefined | null;
    comments: CommentDto[] | undefined | null;
    // client fields
    bookmarked: boolean | undefined | null;
    liked: boolean | undefined | null;
    // reports: Relation<Report[]>;
    // likes: Relation<Like[]>;
}

export class GetArticleResponseDto extends ArticleDto {
    body: string | undefined | null;
}

export class ViewedArticleResponseDto extends ArticleDto {
    todayViews: number | undefined | null;
}

export class NotificationDto {
    creator: UserDto | undefined | null;
    owner: UserDto | undefined | null;
    article?: ArticleDto | undefined | null;
    type: 'like' | 'comment' | 'follow' | undefined | null;
    content?: string | undefined | null;
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

export class CommentDto {
    id: number | undefined | null;
    body: string | undefined | null;
    created_at: string | undefined | null;
    childNumber: number | undefined | null;
    owner: UserDto | undefined | null;
    parent: CommentDto | undefined | null;
    children: CommentDto[] | undefined | null;
    article?: ArticleDto | undefined | null;
}

export class ReportDto {
    id: number | undefined | null;
    owner: UserDto | undefined | null;
    content: string | undefined | null;
    type: ReportTypes | undefined | null;
    comment: CommentDto | undefined | null;
    article?: ArticleDto | undefined | null;
}

// hooks

export class UseUserInfoResult {
    userInfo!: UserDto | null;
    mainUserInfo!: UserDto | null;
    accessToken!: string;
    refreshToken!: string;
    setNewAccessToken!: Function;
    setNewRefreshToken!: Function;
    setNewUser!: Function;
    getAccessToken!: Function;
    logout!: Function;
}

export class UseRequestResult {
    getApis!: Function;
}

export class UseArticlesLandEditorDirectionResult {
    init!: Function;
    check!: Function;
    direction!: 'rtl' | 'ltr';
}

export class UseFetchCategoriesResult {
    categories!: SelectInputItem[];
}

export class UseFetchSelectedCategoriesResult {
    selectedCategories!: CategoryDto[];
    error?: AxiosError | true | null | undefined;
}

export class UseBookmark {
    bookmark!: Function;
}

export class UseFollow {
    follow!: Function;
}

export class UseBlockingUser {
    block!: Function;
}

export class UseLike {
    like!: Function;
}

export class UseUpdateArticle {
    updateArticle!: Function
    removeArticle!: Function
}

// components

export class SelectInputItem {
    value!: string | number;
    label!: string;
}

export class CategoriesTab {
    displayValue!: string;
    value!: string;
    id!: number;
}

export class LinkedItemDto {
    label!: string;
    href!: string;
    icon?: JSX.Element;
    value?: string;
}

export interface StatsTableRowData {
    id: number;
    title: string;
    viewed: number;
    todayView: number;
}

export interface FollowedUserDto {
    id: number;
    avatar: string;
    displayName: string;
    username: string;
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

export type ReportTypes = 'spam' | 'immoral' | 'abusive' | 'illegal' | 'aggressive' | 'other'
export const ReportTypesArray = ['spam', 'immoral', 'abusive', 'illegal', 'aggressive', 'other']

// apis

export class RefreshTokenResponse {
    response: AxiosResponse | undefined;
    refreshTokenResponse: UserAndTokenResponse | undefined;
}

export class APIS {
    auth!: Authentication;
    category!: Category;
    comment!: Comment;
    article!: Article;
    report!: Report;
    admin!: Admin;
    draft!: Draft;
    user!: User;
}

export class PublicAPIS {
    auth!: Authentication;
    category!: Category;
    article!: Article;
    user!: PublicUserApi;
}

export class RequestParams {
    method!: string;
    url!: string;
    data?: object;
    externalUrl?: boolean;
}

export class VerificationResponse {
    key: string | undefined;
}

export class VerificationBody {
    key: string | undefined;
    code: string | undefined;
}

export class PureVerificationBody {
    code: string | undefined;
}

export class UserAndTokenResponse {
    user: object | undefined;
    token: string | undefined;
}

export type refreshTokenHandler = (data: UserAndTokenResponse) => void;

export type LikesAndBookmarksObject = { [key: string]: boolean };

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
    list!: string[] | number[];
}

export class NewCommentBody {
    body!: string;
    parentId?: number | undefined;
}

export class NewReportBody {
    type!: ReportTypes;
    content?: string;
    articleId?: number;
    commentId?: number;
}

// styles

export class ReadArticleBannerProps {
    src?: string | undefined;
}
