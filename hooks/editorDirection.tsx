import React, {useState} from 'react';
import {UseArticlesLandEditorDirectionResult} from "../utils/types";

const rtlDirectionBtnClass = "div.articles-land-editor-container > div.ck.ck-reset.ck-editor.ck-rounded-corners > div.ck.ck-editor__top.ck-reset_all > div > div.ck.ck-sticky-panel__content > div > div > button:nth-child(28)";
const ltrDirectionBtnClass = "div.articles-land-editor-container > div.ck.ck-reset.ck-editor.ck-rounded-corners > div.ck.ck-editor__top.ck-reset_all > div > div.ck.ck-sticky-panel__content > div > div > button:nth-child(29)";

export default function useArticleLandEditorDirection(): UseArticlesLandEditorDirectionResult {
    const [direction, setDirection] = useState<'rtl' | 'ltr'>("ltr")

    const init = (): void => {
        const rtlDirectionBtn = document.querySelector(rtlDirectionBtnClass)
        const ltrDirectionBtn = document.querySelector(ltrDirectionBtnClass)

        rtlDirectionBtn?.addEventListener('click', () => {
            setDirection("rtl")
        })
        ltrDirectionBtn?.addEventListener('click', () => {
            setDirection("ltr")
        })
    }

    return {init, direction}
}
