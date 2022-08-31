import {ArticleCard} from "../../component/auxiliary/articleCard";
import {changeUrlToServerRequest} from "../../utils/helpers";
import {Container, Grid} from "@mantine/core";

export default function ArticlesList() {
    return (
        <Container size={'xl'} mb={'xl'}>
            <Grid>
                <Grid.Col xs={12} sm={6} md={6} lg={4}>
                    <ArticleCard
                        image={changeUrlToServerRequest('/statics/assets/avatars/b5603e780f8d07e0410635e5ccaeac43')}
                        link={'/test'} title={'50 گیاه کم ارزش برای دکوراسیون خانه'}
                        description={'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است...'}
                        category={'دکوراسیون'}
                        author={{
                            name: 'علی رجبی نکو',
                            image: changeUrlToServerRequest('/statics/assets/avatars/b5603e780f8d07e0410635e5ccaeac43'),
                        }}
                        liked={true}
                    />
                </Grid.Col>
                <Grid.Col xs={12} sm={6} md={6} lg={4}>
                    <ArticleCard
                        image={changeUrlToServerRequest('/statics/assets/avatars/b5603e780f8d07e0410635e5ccaeac43')}
                        link={'/test'} title={'50 گیاه کم ارزش برای دکوراسیون خانه'}
                        description={'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است...'}
                        category={'دکوراسیون'}
                        author={{
                            name: 'علی رجبی نکو',
                            image: changeUrlToServerRequest('/statics/assets/avatars/b5603e780f8d07e0410635e5ccaeac43'),
                        }}
                        bookmarked={true}
                    />
                </Grid.Col>
                <Grid.Col xs={12} sm={6} md={6} lg={4}>
                    <ArticleCard
                        image={changeUrlToServerRequest('/statics/assets/avatars/b5603e780f8d07e0410635e5ccaeac43')}
                        link={'/test'} title={'50 گیاه کم ارزش برای دکوراسیون خانه'}
                        description={'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است...'}
                        category={'دکوراسیون'}
                        author={{
                            name: 'علی رجبی نکو',
                            image: changeUrlToServerRequest('/statics/assets/avatars/b5603e780f8d07e0410635e5ccaeac43'),
                        }}
                    />
                </Grid.Col>
                <Grid.Col xs={12} sm={6} md={6} lg={4}>
                    <ArticleCard
                        image={changeUrlToServerRequest('/statics/assets/avatars/b5603e780f8d07e0410635e5ccaeac43')}
                        link={'/test'} title={'50 گیاه کم ارزش برای دکوراسیون خانه'}
                        description={'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است...'}
                        category={'دکوراسیون'}
                        author={{
                            name: 'علی رجبی نکو',
                            image: changeUrlToServerRequest('/statics/assets/avatars/b5603e780f8d07e0410635e5ccaeac43'),
                        }}
                    />
                </Grid.Col>
                <Grid.Col xs={12} sm={6} md={6} lg={4}>
                    <ArticleCard
                        image={changeUrlToServerRequest('/statics/assets/avatars/b5603e780f8d07e0410635e5ccaeac43')}
                        link={'/test'} title={'50 گیاه کم ارزش برای دکوراسیون خانه'}
                        description={'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است...'}
                        category={'دکوراسیون'}
                        author={{
                            name: 'علی رجبی نکو',
                            image: changeUrlToServerRequest('/statics/assets/avatars/b5603e780f8d07e0410635e5ccaeac43'),
                        }}
                    />
                </Grid.Col>
            </Grid>

        </Container>
    )
}