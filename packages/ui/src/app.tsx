import React, { useState } from 'react';
import { MantineProvider, ColorScheme } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Root } from './structure/root';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import store from './store/store';
import { Provider } from 'react-redux';
import { Notifications } from '@mantine/notifications';

function App() {
    const [colorScheme, setColorScheme] = useState('light');
    const beforeColorScheme = localStorage.getItem('colorScheme');
    
    if (beforeColorScheme === null) {
        localStorage.setItem('colorScheme', 'light');
        setColorScheme('light');
    } else {
        if (beforeColorScheme !== colorScheme) {
            setColorScheme(beforeColorScheme);
        }
    }

    function onThemeChange() {
        if (colorScheme === 'light') {
            setColorScheme('dark');
            if (typeof window !== 'undefined') {
                localStorage.setItem('colorScheme', 'dark');
            }
        } else {
            setColorScheme('light');
            if (typeof window !== 'undefined') {
                localStorage.setItem('colorScheme', 'light');
            }
        }
    }

    return (
        <>
            <Provider store={store}>
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        colorScheme: colorScheme as ColorScheme,
                        globalStyles: (theme) => ({
                            body: {
                                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#f7f7f7',
							}
                        }),
                        shadows: {
                            xs: '0 4px 10px rgba(0,0,0,0.05), 0 0 1px rgba(0,0,0,0.1);',
                        },
                    }}
                >
                    <Notifications />
                    <BrowserRouter>
                        <Routes>
                            <Route path='' element={<Root onThemeChange={onThemeChange} />}>
                                <Route path='' element={<HomePage></HomePage>} />
                                <Route path='login' element={<LoginPage></LoginPage>} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </MantineProvider>
            </Provider>
        </>
    );
}

export default App;
