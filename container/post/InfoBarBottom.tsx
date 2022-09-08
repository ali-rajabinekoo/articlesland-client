import React from "react";
import {ActionIcon, Badge, Box, Chip, Container, Group, Menu, Text} from "@mantine/core";
import {IconBookmark, IconDotsVertical, IconEye, IconHeart, IconMessageReport, IconShare} from "@tabler/icons";
import {ArticleDto} from "../../utils/types";
import {useInfoBarBottomStyle} from "./InfoBarBottom.styles";

class InfoBarBottomProps {
    article?: ArticleDto | undefined
}

const InfoBarBottom = ({article}: InfoBarBottomProps) => {
    const {classes, theme} = useInfoBarBottomStyle()

    return (
        <Container size={'md'} my={'md'}>
            <Group position={'apart'}>
                <Box>
                    <Chip variant="filled" radius="sm" size={'sm'} color={'grey.0'} checked={false}>
                        {article?.category?.displayTitle}
                    </Chip>
                </Box>
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
                    {/*<ActionIcon className={classes.action}>*/}
                    {/*    {*/}
                    {/*        liked ?*/}
                    {/*            <IconHeart size={16} color={theme.colors.red[6]} fill={theme.colors.red[6]}/> :*/}
                    {/*            <IconHeart size={16} color={theme.colors.red[6]}/>*/}
                    {/*    }*/}
                    {/*</ActionIcon>*/}
                    {/*<ActionIcon className={classes.action}>*/}
                    {/*    {*/}
                    {/*        bookmarked ?*/}
                    {/*            <IconBookmark size={16} color={theme.colors.yellow[7]} fill={theme.colors.yellow[7]}/> :*/}
                    {/*            <IconBookmark size={16} color={theme.colors.yellow[7]}/>*/}
                    {/*    }*/}
                    {/*</ActionIcon>*/}
                    <ActionIcon className={classes.action}>
                        <IconHeart size={16} color={theme.colors.red[6]}/>
                    </ActionIcon>
                    <ActionIcon className={classes.action}>
                        <IconBookmark size={16} color={theme.colors.yellow[7]}/>
                    </ActionIcon>
                    <ActionIcon className={classes.action}>
                        <IconShare size={16} color={theme.colors.grey[4]}/>
                    </ActionIcon>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <ActionIcon className={classes.action}>
                                <IconDotsVertical size={16} color={theme.colors.grey[4]}/>
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item icon={<IconMessageReport color={theme.colors.grey[4]} size={18}/>}>
                                <Text size={'xs'} color={'grey.5'}>گزارش تخلف</Text>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Group>
        </Container>
    )
}

export default InfoBarBottom
