import {Container, Grid} from "@mantine/core";
import {ArticlesLandEditor, FloatingLabelInput} from "../../component/inputs";
import {useState} from "react";

const EditContainer = () => {
    const [title, setTitle] = useState('');

    const onChangeTitle = (e: any) => {
        setTitle(e.target.value)
    }

    return (
        <Container size={'xl'}>
            <Grid>
                <Grid.Col xl={6} lg={7} md={8} xs={12}>
                    <FloatingLabelInput
                        label={'عنوان مقاله خود را وارد کنید'}
                        onChange={onChangeTitle}
                        value={title}
                    />
                </Grid.Col>
                <Grid.Col xs={12}>
                    <ArticlesLandEditor/>
                </Grid.Col>
            </Grid>
        </Container>
    )
}

export default EditContainer
