import React, {useEffect, useState} from 'react';
import {
    CategoryDto,
    SelectInputItem,
    UseFetchCategoriesResult,
} from "../utils/types";
import {useRecoilValue} from "recoil";
import {getCategoriesSelector} from "../store/selectors/categories";

export default function useFetchCategories(): UseFetchCategoriesResult {
    const categories = useRecoilValue(getCategoriesSelector);
    const [formattedCategories, setFormattedCategories] = useState<SelectInputItem[]>([])

    useEffect(() => {
        if (!!categories) {
            setFormattedCategories(categories.map((el: CategoryDto) => {
                return {
                    label: el.displayTitle,
                    value: el.id,
                }
            }) as SelectInputItem[])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {categories: formattedCategories}
}
