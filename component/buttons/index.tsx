import {Button, Paper, Text, ButtonProps as BasicButtonProps} from "@mantine/core";
import React, {ReactNode} from "react";
import {usePrimaryBtnStyle} from "./styles";

interface PrimaryBtnProps extends BasicButtonProps{
    text?: ReactNode | string
    type?: "button" | "submit" | "reset" | undefined
}

export const PrimaryBtn = (props: PrimaryBtnProps) => {
    const {classes} = usePrimaryBtnStyle()
    return (<Paper shadow="md" p={0} mt="sm">
        <Button 
            fullWidth color={'primary.2'} type={props.type}
            className={classes.btn} size="md" radius={8}
            {...props}
        >
            <Text size={'sm'} weight={600}>{props.text}</Text>
        </Button>
    </Paper>)
}
