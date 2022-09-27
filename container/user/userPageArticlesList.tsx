import {ArticleCard} from "../../component/cards/articleCard";
import {changeUrlToServerRequest} from "../../utils/helpers";
import {Container, Grid} from "@mantine/core";
import {ArticleDto, UserDto} from "../../utils/types";
import React, {useEffect, useState} from "react";
import {EmptyContent} from "../errors/empty";

class UserPageArticlesListProps {
    list?: ArticleDto[]
    owner?: UserDto | undefined
}

export default function UserPageArticlesList({list = [], owner}: UserPageArticlesListProps) {
    const [noContentTitle, setNoContentTitle] = useState<string>('');

    useEffect(() => {
        if (!list || list.length === 0) {
            setNoContentTitle('هیچ پستی برای نمایش وجود ندارد')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list])

    return (
        <Container size={'xl'} mb={150}>
            <Grid>
                {!!noContentTitle && <EmptyContent title={noContentTitle} disableBtn={true}/>}
                {list.map((el: ArticleDto, index: number) => (
                    <Grid.Col xs={12} sm={6} md={6} lg={4} key={index}>
                        <ArticleCard
                            image={!!el?.bannerUrl ? changeUrlToServerRequest(el?.bannerUrl) : undefined}
                            title={el?.title as string || ""}
                            link={el.published ? `/post/${owner?.username}/${el.id}` : `/edit/${el.id}`}
                            description={el?.description as string || ""}
                            category={el?.category?.displayTitle as string || ""}
                            author={{
                                name: owner?.displayName || owner?.username || "",
                                image: !!owner?.avatar ? changeUrlToServerRequest(owner?.avatar) : '',
                            }}
                            liked={true}
                        />
                    </Grid.Col>
                ))}
            </Grid>
        </Container>
    )
}
