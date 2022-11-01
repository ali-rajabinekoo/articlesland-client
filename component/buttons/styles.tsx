import {createStyles} from '@mantine/core';

export const usePrimaryBtnStyle = createStyles((theme) => ({
    btn: {
        '&:hover' : {
            backgroundColor: theme.colors.primary[3]
        },
    }
}));

export const useDangerBtnStyle = createStyles((theme) => ({
    btn: {
        '&:hover' : {
            backgroundColor: theme.colors.danger[4]
        },
    }
}));

export const usePrimaryOutlineBtnStyle = createStyles((theme) => ({
    btn: {
        '&:hover' : {
            backgroundColor: theme.colors.primary[0]
        },
    }
}));

export const useSecondaryBtnStyle = createStyles((theme) => ({
    btn: {
        '&:hover' : {
            backgroundColor: theme.colors.secondary[3]
        },
    }
}));

export const useSecondaryOutlineBtnStyle = createStyles((theme) => ({
    btn: {
        '&:hover' : {
            backgroundColor: theme.colors.secondary[0]
        },
    }
}));
