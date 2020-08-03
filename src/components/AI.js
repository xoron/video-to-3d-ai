import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reset, themes, List, ListItem, Divider, AppBar, Toolbar, Cutout, TextField, Button, Window, WindowContent, WindowHeader } from 'react95';

const createModel = () => {
    // Create a sequential model
    const model = tf.sequential(); 
    
    // Add a single input layer
    model.add(tf.layers.dense({ units: 32, inputShape: [27,200], useBias: true, activation: 'relu'}));

    // Add a few hidden layers
    model.add(tf.layers.dense({ units: 128, activation: 'relu'}));
    model.add(tf.layers.dense({ units: 1024, activation: 'relu'}));
    model.add(tf.layers.dense({ units: 512, activation: 'relu'}));
    model.add(tf.layers.dense({ units: 256, activation: 'relu'}));
    model.add(tf.layers.dense({ units: 64, activation: 'relu'}));

    // Add an output layer
    model.add(tf.layers.dense({units: 2, useBias: true, activation: 'relu'}));

    return model;
}

const base64ToByteArray = (base64String) => {
    try {            
        var sliceSize = 200;
        var byteCharacters = atob(base64String.split('data:image/webp;base64,')[1]);
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);

        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);

            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return byteArrays;
    } catch (e) {
        console.log("Couldn't convert to byte array: " + e);
        return undefined;
    }
}

const createFeatureLabelTensors = (sessions) => {

    const convertToFeatureVector = (
        data
    ) => {
        console.log(base64ToByteArray(data));
        debugger;
        const feature = base64ToByteArray(data.feature);

        return tf.tidy(() => ({
            features: tf.tensor(feature, [27,200]).dataSync(),
            label: tf.tensor([data.label.top, data.label.left], [2]).dataSync()
        }));
    }
    
    return sessions.map(session => session.data
        .filter(data => !!data.label.top)
        .map(convertToFeatureVector))
        .flat();
}

const trainModel = (model, inputs, labels) => {
    // Prepare the model for training.  
    model.compile({
        optimizer: tf.train.adam(),
        loss: tf.losses.meanSquaredError,
        metrics: ['mse'],
    });

    const batchSize = 264;
    const epochs = 500;

    return model.fit(inputs, labels, {
        batchSize,
        epochs,
        shuffle: true
    })
}

const AI = ({
    sessions
}) => {
    debugger;
    const model = createModel();
    const featuresAndLabels = createFeatureLabelTensors(sessions);
    debugger;

    const featureTensors = tf.tensor2d(featuresAndLabels.map(({ features }) => base64ToByteArray(features)), [5600]);
    const labelTensors = tf.tensor2d(featuresAndLabels.map(({ label }) => label), [featuresAndLabels.length, 2]);
    debugger;

    trainModel(model, featureTensors, labelTensors)
        .then(() => {
            console.log('training finished');
            debugger;
            testModel(model, featuresAndLabels);
        });
    debugger;

    return (
        <Window style={{ width: '100%', flex: 2 }}>
            <WindowHeader
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <span>AI.exe</span>
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
                hello world
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
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AI);
