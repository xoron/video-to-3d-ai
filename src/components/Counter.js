import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react95';
import { inc, dec } from '../redux/actions'

const Counter = ({ count, inc, dec }) => {
    debugger;
    return (
        <div style={{ display: 'inline-block', marginBottom: 10 }}>
            <Button onClick={dec}>dec</Button>
            {count}
            <Button onClick={inc}>inc</Button>
        </div>
    );
}

const mapStateToProps = ({ reducers: state }) => {
    debugger;
    return ({
        count: state.count
    })
}
  
const mapDispatchToProps = dispatch => bindActionCreators({
    inc,
    dec
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);
