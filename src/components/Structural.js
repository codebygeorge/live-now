import React, {Component} from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader';
import {PMREMGenerator} from 'three/examples/jsm/pmrem/PMREMGenerator';
import {PMREMCubeUVPacker} from 'three/examples/jsm/pmrem/PMREMCubeUVPacker';
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';
import {ReactComponent as Loader} from "../images/icons/icon_loader.svg";


const style = {
    height: 600
};

class Structural extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.sceneSetup();
        this.addCustomSceneObjects();
        this.startAnimationLoop();
        window.addEventListener("resize", this.handleWindowResize);
    }

    componentWillMount() {

        let counter = 0;
        this.timer = setInterval(() => {
            counter++;

            if(counter === 2) {

                this.setState({
                    loading: false
                }, () => {
                    clearInterval(this.timer);
                });
            }
        }, 1000)
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    }

    sceneSetup = () => {
        const width = this.el.clientWidth;
        const height = this.el.clientHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xd6d6d6);

        this.camera = new THREE.PerspectiveCamera(
            30, // fov = field of view
            width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
        );
        this.camera.position.z = 70; // is used here to set some distance from a cube that is located at z = 0
        // OrbitControls allow a camera to orbit around the object
        // https://threejs.org/docs/#examples/controls/OrbitControls
        this.controls = new OrbitControls(this.camera, this.el);
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(width, height);
        this.el.appendChild(this.renderer.domElement); // mount using React ref
    };

    addCustomSceneObjects = () => {
        this.THREE = THREE;

        // const mtlLoader = new MTLLoader();
        // let onProgress = (e) => {
        //     console.log("rendering:" + e)
        // };
        // let onError = (e) => {
        //     console.log("error:" + e)
        // };
        // mtlLoader.load('data/models/Diamond.mtl', materials => {
        //     materials.preload();
        //
        //     // OBJ Loader
        const objLoader = new OBJLoader();
        //     // this.materials = materials;
        //     objLoader.setMaterials(materials);

        objLoader.load(
            'data/models/Diamond.obj',
            object => {
                this.diamond = object;
                this.scene.add(this.diamond);
            },
            xhr => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            error => {
                console.log('An error happened');
            }
        );

        // }, onProgress, onError);


        // const mtlLoader2 = new MTLLoader();
        // let onProgress2 = (e) => {
        //     console.log("rendering:" + e)
        // };
        // let onError2 = (e) => {
        //     console.log("error:" + e)
        // };
        // mtlLoader2.load('data/models/Shank.mtl', materials => {
        //     materials.preload();
        //
        //     // OBJ Loader
        const objLoader2 = new OBJLoader();
        // objLoader2.setMaterials(materials);

        objLoader2.load(
            'data/models/Shank.obj',
            object => {
                this.shank = object;
                this.scene.add(this.shank);
            },
            xhr => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            error => {
                console.log('An error happened');
            }
        );

        // }, onProgress2, onError2);

        const mtlLoader3 = new MTLLoader();
        let onProgress3 = (e) => {
            console.log("rendering:" + e)
        };
        let onError3 = (e) => {
            console.log("error:" + e)
        };
        mtlLoader3.load('data/models/Setting.mtl', materials => {
            materials.preload();

            // OBJ Loader
            const objLoader2 = new OBJLoader();
            objLoader2.setMaterials(materials);

            objLoader2.load(
                'data/models/Setting.obj',
                object => {
                    this.setting = object;
                    this.scene.add(this.setting);
                },
                xhr => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                error => {
                    console.log('An error happened');
                }
            );

        }, onProgress3, onError3);


        const lights = [];
        lights[0] = new THREE.PointLight(0xffffff, 1, 0);
        lights[1] = new THREE.PointLight(0xffffa8, 1, 0);
        lights[2] = new THREE.PointLight(0xfaffe7, 1, 0);

        lights[0].position.set(0, 200, 0);
        lights[1].position.set(100, 200, 100);
        lights[2].position.set(-100, -200, -100);

        this.scene.add(lights[0]);
        this.scene.add(lights[1]);
        this.scene.add(lights[2]);
    };

    startAnimationLoop = () => {
        if (this.diamond) {
            // this.diamond.rotation.x += 0.01;
            // this.diamond.rotation.y += 0.01;
            this.diamond.rotation.z += 0.01;
        }
        if (this.shank) {
            // this.shank.rotation.x += 0.01;
            // this.shank.rotation.y += 0.01;
            this.shank.rotation.z += 0.01;
        }
        if (this.setting) {
            // this.setting.rotation.x += 0.01;
            // this.setting.rotation.y += 0.01;
            this.setting.rotation.z += 0.01;
        }

        this.renderer.render(this.scene, this.camera);

        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
    };

    handleWindowResize = () => {
        const width = this.el.clientWidth;
        const height = this.el.clientHeight;

        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;

        // Note that after making changes to most of camera properties you have to call
        // .updateProjectionMatrix for the changes to take effect.
        this.camera.updateProjectionMatrix();
    };

    render() {
        const {loading} = this.state;
        return (
            <div className='canvas-wrapper'>
                {loading && <Loader className="loader-svg absolute"/>}

                <div className={loading ? 'canvas' : 'canvas show'} style={style} ref={ref => (this.el = ref)}/>
                <ThreeDRotationIcon className='d-text'/>
            </div>
        )
    }
}


export default Structural;
