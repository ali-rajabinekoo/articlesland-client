import { createStyles, Container, Title, Group, Image } from '@mantine/core';
import {PrimaryBtn} from "../../component/buttons";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
    title: {
        textAlign: 'center',
        fontWeight: 600,
        fontSize: theme.fontSizes.lg,
        color: theme.colors.grey[4],
        lineHeight: 1.4,
        marginTop: -theme.spacing.xl,

        [theme.fn.smallerThan('sm')]: {
            fontSize: 32,
        },
    },
}));

class EmptyContentProps {
    title?: string | undefined;
    btnText?: string | undefined;
    disableBtn?: boolean;
    picWidth?: string;
}

const noContentTitle = 'محتوایی برای نمایش وجود ندارد'
const noContentBtnText = 'ایجاد پست جدید'

export function EmptyContent({
    title = noContentTitle,
    btnText = noContentBtnText, 
    disableBtn = false,
    picWidth = '400px'
}: EmptyContentProps) {
    const { classes } = useStyles();

    return (
        <Container>
            <Image src={"/assets/images/nocontent.svg"} width={picWidth} alt={"/assets/images/nocontent.svg"}/>
            <Title className={classes.title}>{title}</Title>
            {!!btnText && !disableBtn && <Group position="center" mt={'lg'}>
                <Link href={'/edit'}>
                    <PrimaryBtn size="md" text={btnText}/>
                </Link>
            </Group>}
        </Container>
    );
}
