import {createStyles} from "@mantine/core";

export const filterTableStyles = createStyles((theme) => ({
    tableRow: {
        cursor: 'pointer',
        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        userSelect: 'none',
    },

    selectedTableRow: {
        backgroundColor: theme.colors.secondary[0],
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: `${theme.colors.secondary[1]} !important`,
        },
        '-webkit-touch-callout': 'none',
        '-webkit-user-select': 'none',
        '-khtml-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        userSelect: 'none',
    }
}))
