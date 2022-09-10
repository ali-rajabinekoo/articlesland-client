import {MantineThemeOverride} from "@mantine/styles/lib/theme/types";
import '@djthoms/pretty-checkbox';

export const appTheme: MantineThemeOverride = {
    dir: 'rtl',
    colorScheme: 'light',
    fontFamily: 'IRANSansX',
    fontSizes: {
        xs: 12,
        sm: 16,
        md: 18,
        lg: 22,
        xl: 32,
    },
    headings: {
        sizes: {
            h1: {fontWeight: 400, fontSize: 32, lineHeight: 4.5},
            h2: {fontSize: 22, lineHeight: 3},
        },
    },
    colors: {
        primary: ['#FAF7EB', '#EDD983', '#C9AE39', '#B49820', '#8F7607'],
        secondary: ['#D6DCFF', '#8292F0', '#4522CF', '#361E98', '#302368'],
        grey: ['#F0F1F7', '#C2C4C9', '#A3A3A3', '#7B7B7B', '#4B4B4B'],
        danger: ['#FFC0C6', '#EE6F7B', '#DC3545', '#C91223', '#A40010'],
        warning: ['#FFECB4', '#FFD559', '#FFC107', '#DCA501', '#C79500'],
        info: ['#E8EBFF', '#9AA7FF', '#0021FF', '#0019C2', '#001184'],
        success: ['#8FFFA9', '#33D959', '#28A745', '#1F8236', '#0D521D']
    },
    primaryColor: 'primary',
    shadows: {
        xs: '0px 2px 8px rgba(26, 26, 26, 0.24)',
        sm: '0px 8px 16px rgba(26, 26, 26, 0.16)',
    },
    spacing: {
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
        xl: 40,
    },
}
