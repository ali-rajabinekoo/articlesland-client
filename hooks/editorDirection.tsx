import React, {useState} from 'react';
import {UseArticlesLandEditorDirectionResult} from "../utils/types";

const rtlDirectionBtnClass = "div.articles-land-editor-container > div.ck.ck-reset.ck-editor.ck-rounded-corners > div.ck.ck-editor__top.ck-reset_all > div > div.ck.ck-sticky-panel__content > div > div > button:nth-child(28)";
const ltrDirectionBtnClass = "div.articles-land-editor-container > div.ck.ck-reset.ck-editor.ck-rounded-corners > div.ck.ck-editor__top.ck-reset_all > div > div.ck.ck-sticky-panel__content > div > div > button:nth-child(29)";
const rtlTextAlignBtnClass = "div.articles-land-editor-container > div.ck.ck-reset.ck-editor.ck-rounded-corners > div.ck.ck-editor__top.ck-reset_all > div > div.ck.ck-sticky-panel__content > div > div > div.ck.ck-dropdown.ck-toolbar-dropdown.ck-alignment-dropdown > div > div > div > button:nth-child(2)";
const ltrTextAlignBtnClass = "div.articles-land-editor-container > div.ck.ck-reset.ck-editor.ck-rounded-corners > div.ck.ck-editor__top.ck-reset_all > div > div.ck.ck-sticky-panel__content > div > div > div.ck.ck-dropdown.ck-toolbar-dropdown.ck-alignment-dropdown > div > div > div > button:nth-child(1)";

export default function useArticleLandEditorDirection(): UseArticlesLandEditorDirectionResult {
    const [direction, setDirection] = useState<'rtl' | 'ltr'>("ltr")

    const init = (): void => {
        const rtlDirectionBtn = document.querySelector(rtlDirectionBtnClass)
        const ltrDirectionBtn = document.querySelector(ltrDirectionBtnClass)
        const rtlTextAlignBtn = document.querySelector(rtlTextAlignBtnClass)
        const ltrTextAlignBtn = document.querySelector(ltrTextAlignBtnClass)

        rtlDirectionBtn?.addEventListener('click', () => {
            setDirection("rtl")
            // @ts-ignore
            rtlTextAlignBtn?.click()
        })
        ltrDirectionBtn?.addEventListener('click', () => {
            setDirection("ltr")
            // @ts-ignore
            ltrTextAlignBtn?.click()
        })

        // @ts-ignore
        rtlDirectionBtn?.click()
    }

    return {init, direction}
}
