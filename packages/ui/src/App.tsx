import React, { useState } from 'react';
import { MantineProvider, ColorScheme } from '@mantine/core';
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import { Root } from './pages/Root';
import HomePage from './pages/HomePage';
import ForumPage from './pages/Forum';
import LoginPage from './pages/Login';
import store from './store/store';
import { Provider } from 'react-redux';
import { Notifications } from '@mantine/notifications';

declare global {
    interface Window {
        web?: any;
    }
}

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

    /*
<Route path='' element={<HomePage></HomePage>} />
<Route path='forum' element={<ForumPage></ForumPage>} />
<Route path='login' element={<LoginPage></LoginPage>} />
    */

    const router = createBrowserRouter([
        {
            element: <Root onThemeChange={onThemeChange} />,
            
            children: [
                {
                    element: <HomePage />,
                    path: '',
                },
                {
                    element: <ForumPage />,
                    path: 'forum',
                },
                {
                    element: <LoginPage />,
                    path: 'login',
                },
            ],
        },
    ]);

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
                            },
                        }),
                        shadows: {
                            xs: '0 4px 10px rgba(0,0,0,0.05), 0 0 1px rgba(0,0,0,0.1);',
                        },
                    }}
                >
                    <Notifications />
                    {/* <BrowserRouter
                        force
                    >
                        <Routes>
                            <Route
                                loader={async (args) => {
                                    console.log(args);
                                }}
                                path=''
                                element={<Root onThemeChange={onThemeChange} />}
                            >
                                
                            </Route>
                        </Routes>
                    </BrowserRouter> */}
                    <RouterProvider router={router} />
                </MantineProvider>
            </Provider>
        </>
    );
}

export default App;
