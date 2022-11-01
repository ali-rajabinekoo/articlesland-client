import {Button, Paper, Text, ButtonProps as BasicButtonProps} from "@mantine/core";
import React, {MouseEventHandler, ReactNode} from "react";
import {
    useDangerBtnStyle,
    usePrimaryBtnStyle,
    usePrimaryOutlineBtnStyle,
    useSecondaryBtnStyle,
    useSecondaryOutlineBtnStyle
} from "./styles";
import {Sx} from "@mantine/styles/lib/theme/types/DefaultProps";

interface PrimaryBtnProps extends BasicButtonProps {
    text?: ReactNode | string
    type?: "button" | "submit" | "reset" | undefined
    capsule?: "true" | "false" | undefined
    onClick?: MouseEventHandler | undefined
    containersx?: Sx | undefined
}

interface ContainerProps {
    children: JSX.Element | React.ReactNode
    capsule?: "true" | "false" | undefined
    sx?: Sx | undefined
}

const Container = ({children, capsule, sx = {}}: ContainerProps): JSX.Element => {
    return (
        <Paper
            shadow={capsule === 'true' ? undefined : "xs"} p={0}
            sx={{
                borderRadius: capsule ? '20px' : '8px',
                ...sx
            }}
        >
            {children}
        </Paper>
    )
}

export const PrimaryBtn = (props: PrimaryBtnProps) => {
    const {classes} = usePrimaryBtnStyle()
    return (<Container sx={props.containersx || {}} capsule={props.capsule}>
        <Button
            fullWidth color={'primary.2'} type={props.type}
            className={classes.btn} size="md" radius={props.capsule === 'true' ? 22 : 8}
            {...props}
        >
            <Text mr={props.loading ? 10 : 0} size={'sm'} weight={600}>
                {props.text}
            </Text>
        </Button>
    </Container>)
}

export const DangerBtn = (props: PrimaryBtnProps) => {
    const {classes} = useDangerBtnStyle()
    return (<Container sx={props.containersx || {}} capsule={props.capsule}>
        <Button
            fullWidth color={'danger.3'} type={props.type}
            className={classes.btn} size="md" radius={props.capsule === 'true' ? 22 : 8}
            {...props}
        >
            <Text mr={props.loading ? 10 : 0} size={'sm'} weight={600}>
                {props.text}
            </Text>
        </Button>
    </Container>)
}

export const PrimaryOutlineBtn = (props: PrimaryBtnProps) => {
    const {classes} = usePrimaryOutlineBtnStyle()
    return (<Container sx={props.containersx || {}} capsule={props.capsule}>
        <Button
            className={classes.btn} variant={"outline"}
            fullWidth color={'primary.2'} type={props.type}
            size="md" radius={props.capsule ? 22 : 8} {...props}
        >
            <Text mr={props.loading ? 10 : 0} size={'sm'} weight={600}>
                {props.text}
            </Text>
        </Button>
    </Container>)
}

export const SecondaryBtn = (props: PrimaryBtnProps) => {
    const {classes} = useSecondaryBtnStyle()
    return (<Container sx={props.containersx || {}} capsule={props.capsule}>
        <Button
            fullWidth color={'secondary.1'} type={props.type}
            className={classes.btn} size="md" radius={props.capsule === 'true' ? 22 : 8}
            {...props}
        >
            <Text mr={props.loading ? 10 : 0} size={'sm'} weight={600}>
                {props.text}
            </Text>
        </Button>
    </Container>)
}

export const SecondaryOutlineBtn = (props: PrimaryBtnProps) => {
    const {classes} = useSecondaryOutlineBtnStyle()
    return (<Container sx={props.containersx || {}} capsule={props.capsule}>
        <Button
            fullWidth color={'secondary.1'} type={props.type} variant={"outline"}
            className={classes.btn} size="md" radius={props.capsule === 'true' ? 22 : 8}
            {...props}
        >
            <Text mr={props.loading ? 10 : 0} size={'sm'} weight={600}>
                {props.text}
            </Text>
        </Button>
    </Container>)
}

export const FilterBtn = (props: PrimaryBtnProps) => {
    const {classes} = useSecondaryOutlineBtnStyle()
    return (<Container sx={props.containersx || {}} capsule={props.capsule}>
        <Button
            fullWidth color={'secondary.1'} type={props.type} variant={"outline"}
            className={classes.btn} size="md" radius={props.capsule === 'true' ? 22 : 8}
            {...props} sx={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
        >
            <Text mr={props.loading ? 10 : 0} size={'sm'} weight={600}>
                {props.text}
            </Text>
        </Button>
    </Container>)
}
