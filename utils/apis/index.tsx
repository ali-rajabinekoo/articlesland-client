import {APIS} from "../types";
import {Authentication} from "./authentication";
import {Category} from "./category";
import {Article} from "./article";
import {Draft} from "./draft";
import {User} from "./user";

export class Apis implements APIS {
    auth: Authentication
    category: Category
    article: Article
    draft: Draft
    user: User

    constructor() {
        this.auth = new Authentication()
        this.category = new Category()
        this.article = new Article()
        this.draft = new Draft()
        this.user = new User()
    }
}
