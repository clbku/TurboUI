import { ConfigProvider } from 'antd';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { transparentDark } from './themes/transparent-dark';

type ThemeContextType = {
    theme: string
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider: React.FC<PropsWithChildren<{}>> = (props) =>
{
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () =>
    {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ConfigProvider
                theme={transparentDark}
            >
                {props.children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType =>
{
    return useContext(ThemeContext);
};

