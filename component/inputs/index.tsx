import {
    Text,
    TextInput as BasicTextInput,
    TextInputProps as BasicTextInputProps,
    PasswordInput as BasicPasswordInput,
    PasswordInputProps as BasePasswordInputProps
} from "@mantine/core";
import React, {ReactNode, RefObject} from "react";
import {Sx} from "@mantine/styles/lib/theme/types/DefaultProps";
import {usePasswordInputStyle, useScrollContainer, useTextInputStyle} from "./styles";
import VerificationInput from "react-verification-input";

const renderLabel = (props: TextInputProps | PasswordInputProps): ReactNode => {
    let sx: Sx = {}
    let weight: React.CSSProperties['fontWeight'] = "normal"
    if (!!props.labelSX) {
        sx = {...sx, ...props.labelSX}
    }
    if (!!props.labelweight) {
        weight = props.labelweight
    }
    return !!props.labeltitle ? <Text weight={weight} size={"sm"} sx={sx} mb={"xs"} color={"grey.3"}>
        {props.labeltitle}
    </Text> : props.label
}

interface TextInputProps extends BasicTextInputProps {
    labeltitle?: string
    labelSX?: Sx
    labelweight?: React.CSSProperties['fontWeight']
    weight?: React.CSSProperties['fontWeight']
    customref?: RefObject<any>
}

export const TextInput = (props: TextInputProps): JSX.Element => {
    const {classes} = useTextInputStyle()
    return (
        <BasicTextInput
            className={classes.input} ref={props.customref}
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

export const PasswordInput = ({...props}: PasswordInputProps): JSX.Element => {
    const {classes} = usePasswordInputStyle()
    return (
        <BasicPasswordInput
            className={classes.input}
            label={renderLabel(props)} color={"grey.2"}
            placeholder={props.placeholder} {...props}
        />
    )
}

interface VerificationCodeInputsProps {
    onChange?: ((value: string) => void) | undefined
}

export const VerificationCodeInputs = (props: VerificationCodeInputsProps): JSX.Element => {
    return (
        <div style={{display: 'flex', justifyContent: "center"}}>
            <VerificationInput
                length={6} placeholder={''}
                inputProps={{
                    autoComplete: "one-time-code"
                }}
                classNames={{
                    character: 'verification-inputs',
                    container: 'verification-inputs_container',
                    characterSelected: 'verification-inputs_selected',
                }}
                onChange={props.onChange}
            />
        </div>
    )
}

interface ScrollContainerProps {
    children?: React.ReactNode
    scroll?: 'x' | 'y' | 'both'
}

export const ScrollContainer = (props: ScrollContainerProps) => {
    const {classes} = useScrollContainer()
    return (
        <div className={classes.scrollbar} style={props.scroll === 'x' ?
            {overflowX: "auto", overflowY: "hidden"} :
            props.scroll === 'y' ?
                {overflowY: "auto", overflowX: "hidden"} :
                {overflow: "auto"}
        }>{props.children}</div>
    )
}
