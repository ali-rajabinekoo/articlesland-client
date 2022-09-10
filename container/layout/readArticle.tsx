import {Container, Group, Avatar, Stack, Text, ActionIcon, Box} from "@mantine/core";
import {GetArticleResponseDto, UserDto} from "../../utils/types";
import IFrame from "../../component/iframe";
import {changeUrlToServerRequest} from "../../utils/helpers";
import React, {useEffect, useState} from "react";
import moment from "moment-jalaali";
import {IconChevronLeft} from "@tabler/icons";
import ReadArticleBanner from "../../component/readArticleBanner";
import {useReadArticleBannerStyle} from "./readArticle.styles";

class ReadArticleProps {
    user!: UserDto
    onBack?: Function | undefined
    article!: GetArticleResponseDto
    bannerFile?: File | undefined
    action?: React.ReactNode | JSX.Element | undefined
}

const ReadArticle = ({user, article, onBack, bannerFile, action}: ReadArticleProps) => {
    const [fromNowDate, setFromNowDate] = useState<string>()
    const {classes} = useReadArticleBannerStyle()

    useEffect(() => {
        if (!!article?.updated_at) {
            setFromNowDate(moment(article?.updated_at).fromNow())
        }
    }, [article])

    return (
        <Container size={'md'}>
            <Stack align={'stretch'}>
                <Group position={'apart'} noWrap={true}>
                    <Group position={'left'}>
                        <Avatar
                            size={60} className={classes.avatar} radius="xl"
                            src={!!user?.avatar ? changeUrlToServerRequest(user?.avatar as string) : ''}
                        />
                        <Stack spacing={'xs'}>
                            <Text color={'grey.4'} weight={700} size={'md'}>{user?.displayName || user?.username}</Text>
                            <Text color={'grey.4'}>{fromNowDate}</Text>
                        </Stack>
                    </Group>
                    {!!onBack && <div>
                        <ActionIcon variant="transparent" onClick={() => onBack()}>
                            <IconChevronLeft size={25} color={'black'}/>
                        </ActionIcon>
                    </div>}
                    {Boolean(action) && <div>
                            {action}
                    </div>}
                </Group>
                <Text weight={700} size={'lg'} mt={'xl'} color={'grey.4'}>{article?.title}</Text>
                {/*{!!bannerFile && <img src={URL.createObjectURL(bannerFile as File)}/>}*/}
                {!!bannerFile && <Group position={'center'}>
                    <Box>
                        <ReadArticleBanner src={URL.createObjectURL(bannerFile as File)}/>
                    </Box>
                </Group>}
                {!!article?.bannerUrl && <Group position={'center'}>
                    <Box>
                        <ReadArticleBanner src={changeUrlToServerRequest(article.bannerUrl)}/>
                    </Box>
                </Group>}
                <IFrame
                    srcDoc={!!article?.body ? article?.body as string : undefined}
                    srcUrl={!!article?.bodyUrl ? article.bodyUrl as string : undefined}
                />
            </Stack>
        </Container>
    )
}

export default ReadArticle
