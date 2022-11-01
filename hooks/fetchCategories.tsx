import React, {useEffect, useState} from 'react';
import {
    CategoryDto,
    SelectInputItem,
    UseFetchCategoriesResult,
} from "../utils/types";
import {useAppSelector} from "./redux";
import {RootState} from "../utils/app.store";

export default function useFetchCategories(): UseFetchCategoriesResult {
    const categories: CategoryDto[] = useAppSelector((state: RootState) => state.categories.list)
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
