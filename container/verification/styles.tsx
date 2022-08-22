import {createStyles} from '@mantine/core';

export const useVerificationFormStyle = createStyles((theme) => ({
    formTitle: {
        position: "relative",
        width: "100%"
    },
    formAvatar: {
        width: 334,
        height: 334,
        [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
            width: 225,
            height: 225,
        },
    },
    formTitleText: {
        fontSize: theme.fontSizes.xl,
        [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
            fontSize: theme.fontSizes.lg
        },
    },
    backIcon: {
        color: theme.colors.grey[3],
        width: 30,
        position: "absolute",
        right: 0,
        top: 0,
        cursor: "pointer",
        [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
            right: -15
        },
    }
}));