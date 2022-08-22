import {Button, Paper, Text, ButtonProps as BasicButtonProps} from "@mantine/core";
import React, {ReactNode} from "react";
import {usePrimaryBtnStyle, useSecondaryBtnStyle} from "./styles";

interface PrimaryBtnProps extends BasicButtonProps {
    text?: ReactNode | string
    type?: "button" | "submit" | "reset" | undefined
}

export const PrimaryBtn = (props: PrimaryBtnProps) => {
    const {classes} = usePrimaryBtnStyle()
    return (<Paper shadow="xs" p={0} mt="sm" sx={{borderRadius: '8px'}}>
        <Button
            fullWidth color={'primary.2'} type={props.type}
            className={classes.btn} size="md" radius={8}
            {...props}
        >
            <Text size={'sm'} weight={600}>{props.text}</Text>
        </Button>
    </Paper>)
}

export const SecondaryBtn = (props: PrimaryBtnProps) => {
    const {classes} = useSecondaryBtnStyle()
    return (<Paper shadow="xs" p={0} mt="sm" sx={{borderRadius: '8px'}}>
        <Button
            className={classes.btn} variant={"outline"}
            fullWidth color={'primary.2'} type={props.type}
            size="md" radius={8} {...props}
        >
            <Text size={'sm'} weight={600}>{props.text}</Text>
        </Button>
    </Paper>)
}
