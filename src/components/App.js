import React, { useState } from 'react';
import ReduxProvider from '../redux/ReduxProvider';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { reset, themes, List, ListItem, Divider, AppBar, Toolbar, Cutout, TextField, Button, Window, WindowContent, WindowHeader } from 'react95';
import InputData from './InputData';

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
                    <InputData />
                    <div style={{ display: 'flex' }}>
                        <AppBar style={{ position: 'relative' }}>
                            <Toolbar style={{ justifyContent: 'space-between', bottom: 0 }}>
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    {open && (
                                        <List horizontalAlign="left" verticalAlign="top" open={open} onClick={() => setOpen(!open)}>
                                            <ListItem onClick={() => console.log('input data selected')}>👨‍💻 input data</ListItem>
                                            <ListItem onClick={() => console.log('view sessions selected')}>📁 view sessions</ListItem>
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