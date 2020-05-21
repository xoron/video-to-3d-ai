import React, { useState } from 'react';
import ReduxProvider from '../redux/ReduxProvider';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { reset, themes, List, ListItem, Divider, AppBar, Toolbar, Cutout, TextField, Button, Window, WindowContent, WindowHeader } from 'react95';
import Counter from './Counter';

const ResetStyles = createGlobalStyle`
  ${reset}
`;

export default () => {
    const [open, setOpen] = useState(false)
    return (
        <ReduxProvider>
            <ResetStyles />
            <ThemeProvider theme={themes.default}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Window style={{ width: '100%', flex: 2 }}>
                        <WindowHeader
                            style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            }}
                        >
                            <span>react95.exe</span>
                            <Button style={{ marginRight: '-6px', marginTop: '1px' }} size={'sm'} square>
                                <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
                            </Button>
                        </WindowHeader>
                        <Toolbar>
                            <Button variant="menu" size="sm">
                            File
                            </Button>
                            <Button variant="menu" size="sm">
                            Edit
                            </Button>
                            <Button variant="menu" size="sm" disabled>
                            Save
                            </Button>
                        </Toolbar>
                        <WindowContent>
                            <Cutout style={{ width: '300px', height: '200px', padding: 10, overflow: 'scroll' }}>
                                <Counter />
                                <ul>
                                    <li>something here</li>
                                    <li>something here</li>
                                    <li>something here</li>
                                    <li>something here</li>
                                    <li>something here</li>
                                    <li>something here</li>
                                    <li>something here</li>
                                    <li>something here</li>
                                    <li>something here</li>
                                    <li>something here</li>
                                    <li>something here</li>
                                    <li>something here</li>
                                    <li>something here</li>
                                    <li>something here</li>
                                    <li>something here</li>
                                    <li>something here</li>
                                    <li>something here</li>
                                    <li>something here</li>
                                    <li>something here</li>
                                </ul>
                            </Cutout>
                        </WindowContent>
                    </Window>
                <div style={{ display: 'flex' }}>
                    <AppBar style={{ position: 'relative' }}>
                        <Toolbar style={{ justifyContent: 'space-between', bottom: 0 }}>
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                {open && (
                                    <List horizontalAlign="left" verticalAlign="top" open={open} onClick={() => setOpen(!open)}>
                                        <ListItem>👨‍💻 Profile</ListItem>
                                        <ListItem>📁 My account</ListItem>
                                        <Divider />
                                        <ListItem disabled>🔙 Logout</ListItem>
                                    </List>
                                )}
                                <Button onClick={() => setOpen(!open)} active={open} style={{ fontWeight: 'bold' }}>
                                    Start
                                </Button>
                            </div>
                            <TextField placeholder="Search..." width={150} style={{ marginLeft: 4 }} />
                        </Toolbar>
                    </AppBar>
                </div>
                </div>
            </ThemeProvider>
        </ReduxProvider>
    );
}