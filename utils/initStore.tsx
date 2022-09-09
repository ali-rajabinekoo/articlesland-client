import {CategoryDto, PublicAPIS} from "./types";
import {publicApis} from "../hooks/useRequest";
import {AxiosResponse} from "axios";

export const fetchCategories = async () => {
    const {category}: PublicAPIS = publicApis()
    const response: AxiosResponse | undefined = await category.getCategories()
    return response?.data as CategoryDto[]
}
