import {Container, Group, Avatar, Stack, Text, ActionIcon, Box} from "@mantine/core";
import {GetArticleResponseDto, UserDto} from "../../utils/types";
import IFrame from "../../component/auxiliary/iframe";
import {changeUrlToServerRequest} from "../../utils/helpers";
import {useEffect, useState} from "react";
import moment from "moment-jalaali";
import {IconChevronLeft} from "@tabler/icons";
import ReadArticleBanner from "../../component/auxiliary/readArticleBanner";
import {useReadArticleBannerStyle} from "./readArticle.styles";

class ReadArticleProps {
    user!: UserDto
    onBack?: Function | undefined
    article!: GetArticleResponseDto
    bannerFile?: File | undefined
}

const ReadArticle = ({user, article, onBack, bannerFile}: ReadArticleProps) => {
    const [fromNowDate, setFromNowDate] = useState<string>()
    const {classes} = useReadArticleBannerStyle()

    useEffect(() => {
        if (!!article.created_at) {
            setFromNowDate(moment(article.updated_at).fromNow())
        }
    }, [article])

    return (
        <Container size={'xl'}>
            <Stack align={'stretch'}>
                <Group position={'apart'} noWrap={true}>
                    <Group position={'left'}>
                        <Avatar size={60} className={classes.avatar} src={changeUrlToServerRequest(user.avatar as string)} radius="xl"/>
                        <Stack spacing={'xs'}>
                            <Text color={'grey.5'} weight={700} size={'md'}>{user?.displayName || user?.username}</Text>
                            <Text color={'grey.5'}>{fromNowDate}</Text>
                        </Stack>
                    </Group>
                    {!!onBack && <div>
                        <ActionIcon variant="transparent" onClick={() => onBack()}>
                            <IconChevronLeft size={25} color={'black'}/>
                        </ActionIcon>
                    </div>}
                </Group>
                <Text weight={700} size={'lg'} mt={'xl'} color={'grey.5'}>{article?.title}</Text>
                {/*{!!bannerFile && <img src={URL.createObjectURL(bannerFile as File)}/>}*/}
                {!!bannerFile && <Group position={'center'}>
                    <Box>
                        <ReadArticleBanner src={URL.createObjectURL(bannerFile as File)}/>
                    </Box>
                </Group>}
                <IFrame srcDoc={article.body as string} srcUrl={!!article.body ? undefined : article.bodyUrl as string}/>
            </Stack>
        </Container>
    )
}

export default ReadArticle
