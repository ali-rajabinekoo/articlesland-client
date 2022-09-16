import {createStyles} from '@mantine/core';

interface useTextInputStyleProps {
    darker?: boolean | undefined,
    textcolor?: string | undefined
}

export const useTextInputStyle = createStyles((theme, {darker, textcolor}: useTextInputStyleProps) => {
        return ({
            input: {
                '& .mantine-Input-input': {
                    border: `1px solid ${theme.colors.grey[0]} !important`,
                    borderRadius: '8px',
                    backgroundColor: "#FCFDFE",
                    fontSize: theme.fontSizes.sm,
                    color: !!textcolor ? textcolor : !!darker ? theme.colors.grey[4] : theme.colors.grey[3]
                },
                '& .mantine-Input-input::placeholder': {
                    color: !!textcolor ? textcolor : !!darker ? theme.colors.grey[4] : theme.colors.grey[3]
                }
            }
        })
    }
);

interface usePasswordInputStyleProps extends useTextInputStyleProps {
    darker?: boolean | undefined,
    textcolor?: string | undefined
}

export const usePasswordInputStyle = createStyles((theme, {textcolor}: usePasswordInputStyleProps) => ({
    input: {
        '& .mantine-Input-input': {
            borderRadius: '8px',
            border: `1px solid ${theme.colors.grey[0]} !important`,
            backgroundColor: "#FCFDFE",
        },
        '& .mantine-PasswordInput-innerInput::placeholder': {
            color: !!textcolor ? textcolor : theme.colors.grey[3]
        },
        '& .mantine-PasswordInput-innerInput': {
            fontSize: theme.fontSizes.sm,
            color: !!textcolor ? textcolor : theme.colors.grey[3]
        }
    }
}));

class UseScrollContainerProps {
    bgColor?: string | undefined
    scroll?: 'x' | 'y' | 'both'
    hover?: false | true
}

export const useScrollContainer = createStyles((theme, props:UseScrollContainerProps) => ({
    scrollbar: {
        overflowX: props.hover ? 'hidden' : props.scroll === 'x' ? "auto" : 'hidden',
        overflowY: props.hover ? 'hidden' : props.scroll === 'y' ? "hidden" : 'auto',
        '&:hover':{
            overflowX: props.scroll === 'x' ? "auto" : 'hidden',
            overflowY: props.scroll === 'y' ? "hidden" : 'auto',
        },
        '&:active':{
            overflowX: props.scroll === 'x' ? "auto" : 'hidden',
            overflowY: props.scroll === 'y' ? "hidden" : 'auto',
        },
        '&::-webkit-scrollbar': {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            width: theme.spacing.sm,
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        '&::-webkit-scrollbar-track:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#babac0',
            borderRadius: '16px',
            border: `5px solid ${!!props?.bgColor ? props.bgColor : '#fff'}`,
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#a0a0a5',
            border: '4px solid #f4f4f4',
        },
        '&::-webkit-scrollbar-button': {
            display: 'none',
        },
    }
}))

export const useFloatingLabelInputStyle = createStyles((theme, {floating}: { floating: boolean }) => ({
    root: {
        position: 'relative',
    },

    label: {
        position: 'absolute',
        zIndex: 2,
        top: 7,
        left: theme.spacing.sm,
        pointerEvents: 'none',
        color: floating
            ? theme.colorScheme === 'dark'
                ? theme.white
                : theme.colors.grey[4]
            : theme.colorScheme === 'dark'
                ? theme.colors.dark[3]
                : theme.colors.grey[4],
        transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
        transform: floating ? `translate(-${theme.spacing.sm}px, -28px)` : 'none',
        fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
        fontWeight: floating ? 500 : 400,
    },

    required: {
        transition: 'opacity 150ms ease',
        opacity: floating ? 1 : 0,
    },

    input: {
        '& .mantine-Input-input': {
            border: `1px solid ${theme.colors.grey[0]} !important`,
            borderRadius: '8px',
            backgroundColor: "#FCFDFE",
            fontSize: theme.fontSizes.sm,
            color: `${theme.colors.grey[3]} !important`
        },
        '& .mantine-Input-input::placeholder': {
            color: theme.colors.grey[4]
        }
    }
}));

export const useCheckboxStyle = createStyles(() => ({
    checkbox: {
        borderRadius: "50%"
    }
}));
