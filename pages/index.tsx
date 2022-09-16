import type {NextPage} from 'next'
import {DashboardHeader} from "../container/layout/dashboard";
import CategoriesTab from "../container/dashboard/categoriesTab";
import useUserInfo from "../hooks/useUserInfo";
import {CategoryDto, UseFetchSelectedCategoriesResult, UseUserInfoResult} from "../utils/types";
import React, {useEffect, useState} from "react";
import useFetchSelectedCategories from "../hooks/useFetchSelectedCategories";
import {CategoriesTab as CategoriesTabType} from '../utils/types'

const Home: NextPage = () => {
    const {selectedCategories}: UseFetchSelectedCategoriesResult = useFetchSelectedCategories(false)
    const [tabs, setTabs] = useState<CategoriesTabType[]>([])
    const {userInfo}:UseUserInfoResult = useUserInfo()

    useEffect(() => {
        if (selectedCategories.length !== 0) {
            setTabs(selectedCategories.map((category: CategoryDto) => {
                return {
                    displayValue: category.displayTitle,
                    value: category.title,
                } as CategoriesTabType
            }))
        }
    }, [selectedCategories])

    return (
        <div>
            <DashboardHeader headerTabs={
                !!userInfo && tabs?.length !== 0 ? <CategoriesTab tabs={tabs}/> : undefined
            }/>
        </div>
    )
}

export default Home
