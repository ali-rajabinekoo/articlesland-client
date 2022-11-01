import {ArticleDto, UserDto, UseUpdateArticle, UseUserInfoResult} from "../utils/types";
import useUserInfo from "./useUserInfo";

const useUpdateArticle = (): UseUpdateArticle => {
    const {userInfo, setNewUser}: UseUserInfoResult = useUserInfo();

    const addArticle = (newArticle: ArticleDto) => {
        let newUserInfo: UserDto = {...userInfo} as UserDto
        if (Array.isArray(newUserInfo?.articles)) {
            newUserInfo.articles = [...newUserInfo.articles, newArticle];
        } else {
            newUserInfo.articles = [newArticle];
        }
        setNewUser(newUserInfo)
    }
    
    const updateArticle = (articleId: number, newArticle: ArticleDto) => {
        let newUserInfo: UserDto = {...userInfo} as UserDto
        if (!!newUserInfo?.articles) {
            newUserInfo.articles = newUserInfo.articles.map((el: ArticleDto) => {
                if (el.id === articleId) {
                    return { ...newArticle }
                }
                return {...el}
            })
        }
        if (!!newUserInfo?.likes) {
            newUserInfo.likes = newUserInfo.likes.map((el: ArticleDto) => {
                if (el.id === articleId) {
                    return { ...newArticle }
                }
                return {...el}
            })
        }
        if (!!newUserInfo?.bookmarks) {
            newUserInfo.bookmarks = newUserInfo.bookmarks.map((el: ArticleDto) => {
                if (el.id === articleId) {
                    return { ...newArticle }
                }
                return {...el}
            })
        }
        setNewUser(newUserInfo)
    }

    const removeArticle = (articleId: number) => {
        let newUserInfo: UserDto = {...userInfo} as UserDto
        if (!!newUserInfo?.articles) {
            newUserInfo.articles = newUserInfo.articles.filter((el: ArticleDto) => el.id !== articleId)
        }
        if (!!newUserInfo?.likes) {
            newUserInfo.likes = newUserInfo.likes.filter((el: ArticleDto) => el.id !== articleId)
        }
        if (!!newUserInfo?.bookmarks) {
            newUserInfo.bookmarks = newUserInfo.bookmarks.filter((el: ArticleDto) => el.id !== articleId)
        }
        setNewUser(newUserInfo)
    }
    
    return { updateArticle, removeArticle, addArticle }
}

export default useUpdateArticle