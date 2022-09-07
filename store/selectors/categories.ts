import {selector} from "recoil";
import {categoriesState} from "../atoms/categories";

export const getCategoriesSelector = selector({
    key: 'getCategoriesSelector',
    get: async ({get}) => {
        return get(categoriesState);
    }
})
