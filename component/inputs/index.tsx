import {
    Text,
    TextInput as BasicTextInput,
    TextInputProps as BasicTextInputProps,
    PasswordInput as BasicPasswordInput,
    PasswordInputProps as BasePasswordInputProps
} from "@mantine/core";
import React, {ReactNode, useMemo, useState} from "react";
import {Sx} from "@mantine/styles/lib/theme/types/DefaultProps";
import {usePasswordInputStyle, useTextInputStyle} from "./styles";

const renderLabel = (props: TextInputProps | PasswordInputProps): ReactNode => {
    let sx: Sx = {}
    let weight: React.CSSProperties['fontWeight'] = "normal"
    if (!!props.labelSX) {
        sx = {...sx, ...props.labelSX}
    }
    if (!!props.labelweight) {
        weight = props.labelweight
    }
    return !!props.labeltitle ? <Text weight={weight} size={"sm"} sx={sx} color={"grey.3"}>
        {props.labeltitle}
    </Text> : props.label
}

interface TextInputProps extends BasicTextInputProps {
    labeltitle?: string
    labelSX?: Sx
    labelweight?: React.CSSProperties['fontWeight']
    weight?: React.CSSProperties['fontWeight']
}

export const TextInput = (props: TextInputProps) => {
    const {classes} = useTextInputStyle()
    return (
        <BasicTextInput
            className={classes.input}
            label={renderLabel(props)} color={"grey.2"}
            placeholder={props.placeholder} {...props}
        />
    )
}

interface PasswordInputProps extends BasePasswordInputProps {
    labeltitle?: string
    labelSX?: Sx
    labelweight?: React.CSSProperties['fontWeight']
    weight?: React.CSSProperties['fontWeight']
}

export const PasswordInput = ({...props}: PasswordInputProps) => {
    const {classes} = usePasswordInputStyle()
    return (
        <BasicPasswordInput
            className={classes.input}
            label={renderLabel(props)} color={"grey.2"}
            placeholder={props.placeholder} {...props}
        />
    )
}
