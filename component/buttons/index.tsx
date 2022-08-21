import {Button, Paper, Text} from "@mantine/core";
import React, {ReactNode} from "react";
import {usePrimaryBtnStyle} from "./styles";

interface PrimaryBtnProps {
    text?: ReactNode | string
}

export const PrimaryBtn = ({text}: PrimaryBtnProps) => {
    const {classes} = usePrimaryBtnStyle()
    return (<Paper shadow="md" p={0} mt="sm">
        <Button fullWidth color={'primary.2'} className={classes.btn} size="md" radius={8}>
            <Text size={'sm'} weight={600}>{text}</Text>
        </Button>
    </Paper>)
}
