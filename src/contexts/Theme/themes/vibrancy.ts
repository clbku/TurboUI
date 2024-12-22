import { theme } from 'antd';

const baseColor = 'rgba(255, 255, 255, 0.65)';

export const vibrancy = {
    algorithm: theme.darkAlgorithm as any,
    token: {
        // Seed Token
        colorPrimary: '#00b96b',
        borderRadius: 2,
        colorBgContainer: 'transparent',
        // colorPrimaryBg: '#111a2c',
        color: 'red',
        colorText: baseColor,

        // Alias Token

    },

    components: {
        Layout: {
            bodyBg: 'transparent',
        },

        Menu: {
            activeBarBorderWidth: 0,
            itemColor: baseColor,
            variantColor: baseColor,
        },

        Button: {
            defaultColor: baseColor,
            colorPrimaryBg: '#00b96b11',
            colorPrimaryBgHover: '#00b96b66',
            colorErrorBg: '##ff4d4f11',
            colorErrorBgFilledHover: '##ff4d4f66',
        },

        Breadcrumb: {
            itemColor: baseColor,
            linkColor: baseColor,
            separatorColor: 'rgba(255, 255, 255, 0.1)',
        },

        Table: {
            borderColor: 'transparent',
            headerSplitColor: 'transparent',
            headerColor: baseColor,
            rowHoverBg: 'rgba(255, 255, 255, 0.05)',
            rowSelectedBg: '#00b96b11',
            rowSelectedHoverBg: '#00b96b66',
        },

        Divider: {
            colorSplit: 'rgba(255, 255, 255, 0.1)',
        },

        Card: {
            colorBorderSecondary: 'rgba(255, 255, 255, 0.1)',
        },

        Typography: {
            colorText: baseColor,
        },

        Form: {
            labelFontSize: '13px',
            fontSize: '10px',
        },
    },
};
