import {createStyles} from "@mantine/core";

export const useCommentStyles = createStyles((theme) => ({
    wrapper: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
    commentWrapper: {
        border: 'none'
    },
}));
