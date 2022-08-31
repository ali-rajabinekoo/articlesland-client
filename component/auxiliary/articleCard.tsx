import {IconBookmark, IconEye, IconHeart, IconShare} from '@tabler/icons';
import {
    createStyles,
    Card,
    Image,
    Text,
    ActionIcon,
    Badge,
    Group,
    Center,
    Avatar,
    Box,
    Divider,
    Stack,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    action: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        ...theme.fn.hover({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        }),
    },

    title: {
        width: "100%",
        overflow: 'hidden',
        textOverflow: "ellipsis",
        whiteSpace: 'nowrap',
        marginTop: theme.spacing.sm,
        fontSize: theme.fontSizes.md,
        fontWeight: 600,
    },

    body: {
        display: "-webkit-box",
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },

    footer: {
        padding: theme.spacing.xs,
    },
}));

interface ArticleCardProps {
    image: string;
    link: string;
    title: string;
    description: string;
    category: string;
    liked?: true | false,
    bookmarked?: true | false,
    author: {
        name: string;
        image: string;
    };
}

export function ArticleCard({
    className,
    image,
    link,
    title,
    description,
    author,
    category,
    liked = false,
    bookmarked = false,
    ...others
}: ArticleCardProps & Omit<React.ComponentPropsWithoutRef<'div'>, keyof ArticleCardProps>) {
    const {classes, cx, theme} = useStyles();
    const linkProps = {href: link, target: '_blank', rel: 'noopener noreferrer'};

    return (
        <Card dir={'rtl'} withBorder radius="md" p={0} className={cx(classes.card, className)} {...others}>
            <Card.Section>
                <a {...linkProps}>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <Image src={image} height={180}/>
                </a>
            </Card.Section>
            <Stack p={'sm'} spacing={'xs'}>
                <Group position={"right"}>
                    <Badge color="secondary.0" size="md">
                        <Text color="secondary.3" weight={400} size={'xs'}>{category}</Text>
                    </Badge>
                </Group>

                <Text className={classes.title} component="a" {...linkProps}>
                    {title}
                </Text>

                <Text className={classes.body} size="sm" weight={400} color="grey.3" lineClamp={4}>
                    {description}
                </Text>
            </Stack>

            <Divider m={0}/>

            <Group position="apart" p={'xs'} spacing={'xs'}>
                <Center>
                    <Avatar src={author.image} size={24} radius="xl" mr="xs"/>
                    <Text size="sm" inline>
                        {author.name}
                    </Text>
                </Center>

                <Group spacing={8} mr={0}>
                    <Badge size="sm" radius="xs" className={classes.action} py={3.5} sx={{height: "100%"}}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <IconEye size={16} color={theme.colors.grey[4]}/>
                            <Text component={'span'} sx={{fontFamily: "Poppins"}} ml={5} mt={2.2} size={12}
                                  color={theme.colors.grey[4]}>
                                26
                            </Text>
                        </Box>
                    </Badge>
                    <ActionIcon className={classes.action}>
                        {
                            liked ?
                                <IconHeart size={16} color={theme.colors.red[6]} fill={theme.colors.red[6]}/> :
                                <IconHeart size={16} color={theme.colors.red[6]}/>
                        }
                    </ActionIcon>
                    <ActionIcon className={classes.action}>
                        {
                            bookmarked ?
                                <IconBookmark size={16} color={theme.colors.yellow[7]} fill={theme.colors.yellow[7]}/>:
                                <IconBookmark size={16} color={theme.colors.yellow[7]}/>
                        }
                    </ActionIcon>
                    <ActionIcon className={classes.action}>
                        <IconShare size={16} color={theme.colors.grey[4]}/>
                    </ActionIcon>
                </Group>
            </Group>
        </Card>
    );
}