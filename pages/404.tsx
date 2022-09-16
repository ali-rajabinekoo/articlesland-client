import {createStyles, Image, Container, Title, Text, SimpleGrid} from '@mantine/core';
import {DashboardHeader} from "../container/layout/dashboard";
import React from "react";

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
    },

    title: {
        fontWeight: 900,
        fontSize: theme.fontSizes.xl,
        marginBottom: theme.spacing.md,
        lineHeight: '41.6px',
        color: theme.colors.grey[4],

        [theme.fn.smallerThan('sm')]: {
            fontSize: theme.fontSizes.lg,
        },
    },

    description: {
        fontWeight: 400,
        fontSize: theme.fontSizes.md,
        lineHeight: '23.4px',
        color: theme.colors.grey[4],

        [theme.fn.smallerThan('sm')]: {
            fontSize: theme.fontSizes.lg,
        },
    },

    control: {
        [theme.fn.smallerThan('sm')]: {
            width: '100%',
        },
    },

    mobileImage: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    desktopImage: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },
}));

export default function NotFoundPage() {
    const {classes} = useStyles();

    return (
        <div>
            <DashboardHeader/>
            <Container className={classes.root} size={'xl'}>
                <SimpleGrid spacing={80} cols={2} sx={{alignItems: 'center'}}
                            breakpoints={[{maxWidth: 'sm', cols: 1, spacing: 40}]}>
                    <Image
                        src={'/assets/images/notfound-image.svg'}
                        alt={'/assets/images/notfound-image.svg'}
                        className={classes.mobileImage}
                    />
                    <div>
                        <Title className={classes.title}>
                            خطایی پیش آمده...
                        </Title>
                        <Text className={classes.description} size="lg">
                            صفحه ای که می خواهید باز کنید وجود ندارد. ممکن است مجوز دسترسی به این صفحه را ندارید و یا
                            صفحه به URL دیگری منتقل شده باشد.
                            اگر فکر می کنید این یک خطا است با پشتیبانی تماس بگیرید.
                        </Text>
                    </div>
                    <Image
                        src={'/assets/images/notfound-image.svg'}
                        alt={'/assets/images/notfound-image.svg'}
                        className={classes.desktopImage}
                    />
                </SimpleGrid>
            </Container>
        </div>
    )
}
