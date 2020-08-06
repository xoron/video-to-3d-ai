import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reset, themes, List, ListItem, Divider, AppBar, Toolbar, Cutout, TextField, Button, Window, WindowContent, WindowHeader } from 'react95';
import SessionPreview from './SessionPreview';
import {deleteSession} from '../redux/input-data/actions';


const Sessions = ({
    sessions,
    deleteSession
}) => {
    console.log(sessions)
    return (
        <Window style={{ width: '100%', flex: 2 }}>
            <WindowHeader
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <span>Sessions.exe</span>
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
                {sessions.map((session, index) => <SessionPreview key={index} session={session} deleteSession={() => deleteSession(index)} />)}
            </WindowContent>
        </Window>
    )
};

const mapStateToProps = ({ inputData }) => {
    return ({
        sessions: inputData.sessions
    })
}
  
const mapDispatchToProps = dispatch => bindActionCreators({
    deleteSession
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sessions);
