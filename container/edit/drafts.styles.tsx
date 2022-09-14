import {createStyles} from "@mantine/core";

export const useDraftsStyles = createStyles((theme) => ({
    wrapper: {
        border: `1px solid ${theme.colors.grey[1]}`,
        borderRadius: '4px',
    },
    item: {
        border: 'none'
    },
    cardsWrapper: {
        padding: '24px 16px',
    }
}))
