import React, {MouseEventHandler} from "react";
import {createStyles, Card, Overlay, CardProps, Text} from '@mantine/core';

const useStyles = createStyles(() => ({
    card: {
        height: 100,
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        cursor: 'pointer',
    },

    content: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
}));

interface ImageActionBannerProps {
    title: React.ReactNode;
    image: string;
    action?: Function | undefined;
    selected?: true | false;
}

export function CategoryCard({
    title,
    image,
    action,
    selected = false,
    style,
    className,
    ...others
}: ImageActionBannerProps & Omit<CardProps, keyof ImageActionBannerProps | 'children'>) {
    const {classes, cx, theme} = useStyles();

    const onClick: MouseEventHandler = (): void => {
        if (!!action) action()
    }

    return (
        <Card
            radius="md"
            style={{backgroundImage: `url(${image})`, ...style}}
            className={cx(classes.card, className)}
            onClick={onClick}
            {...others}
        >
            <Overlay
                color={
                    selected ? theme.colors.primary[2] : theme.colors.secondary[4]
                }
                opacity={0.60}
                zIndex={0}
            />

            <div className={classes.content}>
                <Text align={'center'} color={"white"} size={'md'} weight={700}>{title}</Text>
            </div>
        </Card>
    );
}
