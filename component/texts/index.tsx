import {Text as BasicText, TextProps as BasicTextProps} from "@mantine/core";
import {Sx} from "@mantine/styles/lib/theme/types/DefaultProps";
import {useMemo} from "react";
import {fontFamilyByWeight} from "../../pages/_app.style";
import {fontWeightFamily} from "../../utils/types";

interface TextProps extends BasicTextProps {
    textFontWeight?: fontWeightFamily
}

export const Text = (props: TextProps) => {
    const sxAndProps: { sx: Sx, properties: TextProps } = useMemo(() => {
        const style: Sx = {}
        const properties: TextProps = {...props}
        if (!!props.textFontWeight) {
            style.fontFamily = fontFamilyByWeight[props.textFontWeight]
            delete properties.weight
        }
        return {sx: style, properties}
    }, [])
    return (<BasicText {...sxAndProps.properties} sx={sxAndProps.sx}>
        {props.children}
    </BasicText>)
}
