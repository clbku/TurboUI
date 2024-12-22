import { ConfigProvider } from 'antd';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { dark } from './themes/dark';
import { light } from './themes/light';
import { vibrancy } from './themes/vibrancy';


type ThemeContextType = {
    theme: string
    toggleTheme: () => void
}

enum Theme {
    dark = 'dark',
    light = 'light',
    vibrancy = 'vibrancy'
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider: React.FC<PropsWithChildren<{}>> = (props) =>
{
    const [theme, setTheme] = useState<Theme>(Theme.dark);

    const toggleTheme = () =>
    {
        if (theme === Theme.dark) {setTheme(Theme.light);}
        if (theme === Theme.light) {setTheme(Theme.vibrancy);}
        if (theme === Theme.vibrancy) {setTheme(Theme.dark);}
    };

    const getTheme = () =>
    {
        if (theme === Theme.dark) {return dark;}
        if (theme === Theme.light) {return light;}
        if (theme === Theme.vibrancy) {return vibrancy;}
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <ConfigProvider
                theme={getTheme()}
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

