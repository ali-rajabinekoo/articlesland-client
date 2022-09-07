import {atom, selector} from "recoil";
import {publicApis} from "../../hooks/useRequest";
import {CategoryDto, PublicAPIS} from "../../utils/types";
import {AxiosResponse} from "axios";

const fetchCategories = selector({
    key: 'fetchCategoriesSelector',
    get: async () => {
        const {category}: PublicAPIS = publicApis()
        const response: AxiosResponse | undefined = await category.getCategories()
        return response?.data as CategoryDto[]
    }
})

export const categoriesState = atom({
    key: 'categoriesState',
    default: fetchCategories,
});
