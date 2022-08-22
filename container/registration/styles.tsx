import {createStyles} from '@mantine/core';

export const useRegistrationFormStyle = createStyles((theme) => ({
    formTitle: {
        position: "relative",
        width: "100%"
    },
    backIcon: {
        color: theme.colors.grey[3],
        width: 30,
        position: "absolute",
        right: 0,
        top: 0,
        cursor: "pointer"
    }
}));