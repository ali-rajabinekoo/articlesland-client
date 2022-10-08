import React, {MouseEventHandler, useState} from "react";
import {ActionIcon, Box, Chip, Container, Group, Menu, Text} from "@mantine/core";
import {IconBookmark, IconDotsVertical, IconHeart, IconMessageReport, IconShare} from "@tabler/icons";
import {ArticleDto} from "../../utils/types";
import {useInfoBarBottomStyle} from "./InfoBarBottom.styles";
import ReportBadContentModal from "../../component/wrappers/reportBadContentModal";

class InfoBarBottomProps {
    article?: ArticleDto | undefined;
    bookmarked?: boolean | undefined;
    liked?: boolean | undefined;
    onClickBookmark?: Function | undefined;
    onClickLike?: Function | undefined;
    disableUserPanel?: boolean;
}

const InfoBarBottom = ({
    article,
    bookmarked,
    liked,
    onClickBookmark,
    onClickLike,
    disableUserPanel
}: InfoBarBottomProps) => {
    const {classes, theme} = useInfoBarBottomStyle()
    const [opened, setOpened] = useState(false);

    return (
        <Container size={'md'} my={'md'} px={0}>
            <Group position={'apart'} className={classes.articleInfoFooter}>
                <Box>
                    {!!article?.category?.displayTitle &&
                        <Chip variant="filled" radius="sm" size={'sm'} color={'grey.0'} checked={false}>
                            {article?.category?.displayTitle}
                        </Chip>}
                </Box>
                <Group spacing={8} m={0} sx={{display: disableUserPanel ? 'none' : 'flex'}}>
                    {/*<Badge size="sm" radius="xs" className={classes.action} py={3.5} sx={{height: "100%"}}>*/}
                    {/*    <Box sx={{display: 'flex', alignItems: 'center'}}>*/}
                    {/*        <IconEye size={16} color={theme.colors.grey[4]}/>*/}
                    {/*        <Text component={'span'} sx={{fontFamily: "Poppins"}} ml={5} mt={2.2} size={12}*/}
                    {/*              color={theme.colors.grey[4]}>*/}
                    {/*            26*/}
                    {/*        </Text>*/}
                    {/*    </Box>*/}
                    {/*</Badge>*/}
                    {/*<ActionIcon className={classes.action}>*/}
                    {/*    {*/}
                    {/*        liked ?*/}
                    {/*            <IconHeart size={16} color={theme.colors.red[6]} fill={theme.colors.red[6]}/> :*/}
                    {/*            <IconHeart size={16} color={theme.colors.red[6]}/>*/}
                    {/*    }*/}
                    {/*</ActionIcon>*/}
                    <ActionIcon onClick={onClickLike as MouseEventHandler} className={classes.action}>
                        {
                            liked ?
                                <IconHeart size={16} color={theme.colors.red[6]} fill={theme.colors.red[6]}/> :
                                <IconHeart size={16} color={theme.colors.red[6]}/>
                        }
                    </ActionIcon>
                    <ActionIcon onClick={onClickBookmark as MouseEventHandler} className={classes.action}>
                        {
                            bookmarked ?
                                <IconBookmark size={16} color={theme.colors.yellow[7]} fill={theme.colors.yellow[7]}/> :
                                <IconBookmark size={16} color={theme.colors.yellow[7]}/>
                        }
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
                            <Menu.Item 
                                icon={<IconMessageReport color={theme.colors.grey[4]} size={18}/>}
                                onClick={() => setOpened(true)}
                            >
                                <Text size={'xs'} color={'grey.4'}>گزارش تخلف</Text>
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Group>
            <ReportBadContentModal 
                articleId={article?.id}
                setOpened={setOpened}
                opened={opened}
            />
        </Container>
    )
}

export default InfoBarBottom
