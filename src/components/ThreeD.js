import React, {useRef, useEffect} from 'react';
import { reset, themes, List, ListItem, Divider, AppBar, Toolbar, Cutout, TextField, Button, Window, WindowContent, WindowHeader } from 'react95';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";


const ThreeD = () => {

    const canvasRef = useRef();
    var map = {};

    useEffect(() => {
        if (!!canvasRef.current) {
            var height = canvasRef.current.offsetHeight;
            var width = canvasRef.current.offsetWidth;
            var scene = new THREE.Scene();
            debugger;
            var camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

            
            var renderer = new THREE.WebGLRenderer();
            renderer.setSize( width, height );
            canvasRef.current.appendChild( renderer.domElement );
            var controls = new TrackballControls( camera, renderer.domElement );

            var geometry = new THREE.BoxGeometry();
            var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            var cube = new THREE.Mesh( geometry, material );
            scene.add( cube );

            camera.position.z = 5;

            function onKeyDown(e){
                e = e || event;
                map[e.keyCode] = e.type == 'keydown';
            }

            function onKeyUp(e){
                e = e || event;
                map[e.keyCode] = !e.type == 'keyup';
            }

            var animate = function () {
                requestAnimationFrame( animate );

                cube.rotation.x += 0.05;
                cube.rotation.y += 0.05;
                // camera.translateZ( -0.01 );

                if (map[83]) camera.translateZ( 0.05 );
                if (map[87]) camera.translateZ( -0.05 );
                if (map[68]) camera.translateX( 0.05 );
                if (map[65]) camera.translateX( -0.05 );

                renderer.render( scene, camera );
                document.body.addEventListener( 'keydown', onKeyDown, false );
                document.body.addEventListener( 'keyup', onKeyUp, false );
                // document.body.addEventListener( 'mousemove', onMouseMove, false );
                // controls.update();
            };

            animate();
        }
    }, [canvasRef]);

    

    return (
        <Window style={{ width: '100%', flex: 2 }}>
            <WindowHeader
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <span>3D.exe</span>
                <Button style={{ marginRight: '-6px', marginTop: '1px' }} size={'sm'} square>
                    <span style={{ fontWeight: 'bold', transform: 'translateY(-1px)' }}>x</span>
                </Button>
            </WindowHeader>
            <WindowContent>
                hello world from 3d

                <div style={{height: 500, width: 500}} ref={canvasRef}></div>
            </WindowContent>
        </Window>
    );
};

export default ThreeD;
