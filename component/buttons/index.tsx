import {Button, Paper, Text, ButtonProps as BasicButtonProps} from "@mantine/core";
import React, {ReactNode} from "react";
import {usePrimaryBtnStyle, useSecondaryBtnStyle} from "./styles";

interface PrimaryBtnProps extends BasicButtonProps {
    text?: ReactNode | string
    type?: "button" | "submit" | "reset" | undefined
    capsule?: "true" | "false" | undefined
}

interface ContainerProps {
    children: JSX.Element | React.ReactNode
    capsule?: "true" | "false" | undefined
}

const Container = ({children, capsule}: ContainerProps): JSX.Element => {
    return (
        <Paper shadow={capsule === 'true' ? undefined : "xs"} p={0} mt="sm"
               sx={{borderRadius: capsule ? '20px' : '8px'}}>
            {children}
        </Paper>
    )
}

export const PrimaryBtn = (props: PrimaryBtnProps) => {
    const {classes} = usePrimaryBtnStyle()
    return (<Container capsule={props.capsule}>
        <Button
            fullWidth color={'primary.2'} type={props.type}
            className={classes.btn} size="md" radius={props.capsule === 'true' ? 22 : 8}
            {...props}
        >
            <Text size={'sm'} weight={600}>{props.text}</Text>
        </Button>
    </Container>)
}

export const SecondaryBtn = (props: PrimaryBtnProps) => {
    const {classes} = useSecondaryBtnStyle()
    return (<Container capsule={props.capsule}>
        <Button
            className={classes.btn} variant={"outline"}
            fullWidth color={'primary.2'} type={props.type}
            size="md" radius={props.capsule ? 22 : 8} {...props}
        >
            <Text size={'sm'} weight={600}>{props.text}</Text>
        </Button>
    </Container>)
}
