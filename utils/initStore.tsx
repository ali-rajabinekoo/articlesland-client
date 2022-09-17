import {CategoryDto} from "./types";
import {AxiosResponse} from "axios";
import {Apis} from "./apis";

export const fetchCategories = async () => {
    const {category}: Apis = new Apis()
    const response: AxiosResponse | undefined = await category.getCategories()
    return response?.data as CategoryDto[]
}
