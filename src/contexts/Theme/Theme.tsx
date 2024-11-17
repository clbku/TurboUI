import { ConfigProvider, theme as AntTheme } from 'antd';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

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
                theme={{
                    algorithm: theme === 'dark' ? AntTheme.darkAlgorithm : undefined,
                }}
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

