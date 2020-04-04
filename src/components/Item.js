import React, {Component, createRef} from "react";
import {myAxios, BASE_MEDIA_API} from "../Constants";
import {Checkbox, FormControlLabel, Button, Toolbar} from '@material-ui/core';
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

// import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {HDRCubeTextureLoader} from 'three/examples/jsm/loaders/HDRCubeTextureLoader';
import Stats from 'three/examples/jsm/libs/stats.module';
import {GUI} from 'three/examples/jsm/libs/dat.gui.module';
// import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader';
import {PMREMGenerator} from 'three/examples/jsm/pmrem/PMREMGenerator';
import {PMREMCubeUVPacker} from 'three/examples/jsm/pmrem/PMREMCubeUVPacker';
import {RectAreaLightUniformsLib} from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

import {ReactComponent as Loader} from "../images/icons/icon_loader.svg";
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';

/////////////////////////////// GOOD THING
THREE.Cache.enabled = true;

/////////////////////////////// GOOD THING

class Item extends Component {

    constructor(props) {
        super(props);

        this.materials = [];
        this.origin = new THREE.Vector3();
        this.objects = [];
        this.rotationValue = 0;

        this.state = {
            data: undefined,
            itemLoaded: false,
            error: false,
            checkboxes: {
                shank: true,
                band: true,
                setting: true,
                gem: true,
                halo: true
            },
            indexes: {
                shank: 0,
                band: 0,
                setting: 0,
                gem: 0,
                halo: 0
            }
        };

        this.params = {
            roughness: 0.2,
            metalness: 1,
            // color: new THREE.Color(0xd4af37),
            color: 0xd4af37,
            reflectivity: 0,
            envMapIntensity: 0.8,


            exposure: 1,
            autoRotate: true,
            gemName: 'Diamond',
            metalName: 'Yellow Gold'
        };
    }

    componentDidMount() {
        // document.getElementById('files').addEventListener('change', handleFileSelect, false);
    }

    componentWillMount() {

        // const itemID = parseInt(this.props.match.params.id);

        myAxios.get(`data/items.json`)
            .then(response => {
                this.setState({
                    // data: response.data.find(item => item.id === itemID),
                    data: response.data,
                    error: false
                }, () => {
                    const {data} = this.state;

                    // data.parts.map((detail, index) => {
                    //     this.setState({
                    //         // indexes: [...this.state.indexes, {[detail.name]: 0}]
                    //         indexes: {
                    //             ...this.state.indexes,
                    //             [detail.name]: 0
                    //         }
                    //     })
                    // });

                    // Object.keys(data).map((parts, index) => {
                    //     this[parts] = data[item];
                    // });

                    // console.log(this.state.data);
                    this.startRender();
                });
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: true
                })
            });
    }

    startRender = () => {
        this.sceneSetup();
        this.addCustomSceneObjects();
        this.animate();
        window.addEventListener("resize", this.handleWindowResize);
    };

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleWindowResize);
        window.cancelAnimationFrame(this.requestID);
        this.controls.dispose();
    }

    sceneSetup = () => {
        // get container dimensions and use them for scene sizing
        const width = this.el.clientWidth;
        const height = this.el.clientHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xb0b0b0);

        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 2000);
        this.camera.position.set(0.0, -60, 20 * 3.5);

        this.controls = new OrbitControls(this.camera, this.el);
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setSize(width, height);
        this.el.appendChild(this.renderer.domElement); // mount using React ref
    };

    addCustomSceneObjects = () => {

        const {data} = this.state;

        // var light = new THREE.AmbientLight( 0xd4af37 , 0.5); // soft white light
        // this.scene.add( light );

        RectAreaLightUniformsLib.init();

        //done
        // this.rectLightButtom = new THREE.RectAreaLight(0xf8f7ed, 6, 10, 40);
        // this.rectLightButtom.position.set(25, 20, -20);
        // this.scene.add(this.rectLightButtom);

        // let rectLightMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { side: THREE.BackSide } ) );
        // rectLightMesh.scale.x = this.rectLightButtom.width;
        // rectLightMesh.scale.y = this.rectLightButtom.height;
        // this.rectLightButtom.add( rectLightMesh );
        // let rectLightMeshBack = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { color: 0x080808 } ) );
        // rectLightMesh.add( rectLightMeshBack );

        //done
        // this.rectLightButtom2 = new THREE.RectAreaLight(0xf8f7ed, 6, 40, 10);
        // this.rectLightButtom2.position.set(0, -25, -20);
        // this.scene.add(this.rectLightButtom2);

        // let rectLightMesh2 = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { side: THREE.BackSide } ) );
        // rectLightMesh2.scale.x = this.rectLightButtom2.width;
        // rectLightMesh2.scale.y = this.rectLightButtom2.height;
        // this.rectLightButtom2.add( rectLightMesh2 );
        // let rectLightMeshBack2 = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { color: 0x080808 } ) );
        // rectLightMesh2.add( rectLightMeshBack2 );


        // this.rectLightButtom1 = new THREE.RectAreaLight(0xf8f7ed, 6, 10, 40);
        // this.rectLightButtom1.position.set(-25, 20, -20);
        // this.scene.add(this.rectLightButtom1);

        // let rectLightMesh1 = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { side: THREE.BackSide } ) );
        // rectLightMesh1.scale.x = this.rectLightButtom1.width;
        // rectLightMesh1.scale.y = this.rectLightButtom1.height;
        // this.rectLightButtom1.add( rectLightMesh1 );
        // let rectLightMeshBack1 = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { color: 0x080808 } ) );
        // rectLightMesh1.add( rectLightMeshBack1 );


        // let geoFloor = new THREE.BoxBufferGeometry( 2000, 0.1, 2000 );
        // let matStdFloor = new THREE.MeshStandardMaterial( { color: 0xC0C0C0, roughness: 0.2, metalness: 0 } );
        // let mshStdFloor = new THREE.Mesh( geoFloor, matStdFloor );
        // mshStdFloor.position.set( 0, 0, -12 );
        // mshStdFloor.rotation.x = Math.PI / 2;
        // this.scene.add( mshStdFloor );


        this.rectLight1 = new THREE.RectAreaLight(0xf8f7ed, 1, 20, 20);
        this.rectLight1.position.set(-25, -20, 25);
        this.scene.add(this.rectLight1);

        // let rectLightMesh1 = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { side: THREE.BackSide } ) );
        // rectLightMesh1.scale.x = this.rectLight1.width;
        // rectLightMesh1.scale.y = this.rectLight1.height;
        // this.rectLight1.add( rectLightMesh1 );
        // let rectLightMeshBack1 = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { color: 0x080808 } ) );
        // rectLightMesh1.add( rectLightMeshBack1 );


        this.rectLight2 = new THREE.RectAreaLight(0xf8f7ed, 1, 20, 20);
        this.rectLight2.position.set(0, 25, 25);
        this.scene.add(this.rectLight2);

        // let rectLightMesh2 = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { side: THREE.BackSide } ) );
        // rectLightMesh2.scale.x = this.rectLight2.width;
        // rectLightMesh2.scale.y = this.rectLight2.height;
        // this.rectLight2.add( rectLightMesh2 );
        // let rectLightMeshBack2 = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { color: 0x080808 } ) );
        // rectLightMesh2.add( rectLightMeshBack2 );


        this.rectLight3 = new THREE.RectAreaLight(0xf8f7ed, 1, 20, 20);
        this.rectLight3.position.set(25, -20, 25);
        this.scene.add(this.rectLight3);

        // let rectLightMesh3 = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { side: THREE.BackSide } ) );
        // rectLightMesh3.scale.x = this.rectLight3.width;
        // rectLightMesh3.scale.y = this.rectLight3.height;
        // this.rectLight3.add( rectLightMesh3 );
        // let rectLightMeshBack3 = new THREE.Mesh( new THREE.PlaneBufferGeometry(), new THREE.MeshBasicMaterial( { color: 0x080808 } ) );
        // rectLightMesh3.add( rectLightMeshBack3 );


        this.partAdd(data.parts, true);

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // this.renderer.shadowMap.enabled = true;
        // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // this.container = document.createElement( 'div' );
        // document.body.appendChild( this.container );

        // this.container.appendChild( this.renderer.domElement );
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;
        this.renderer.gammaFactor = 2.5;

        this.stats = new Stats();
        // this.container.appendChild( this.stats.dom );
        // let controls = new OrbitControls( this.camera, this.renderer.domElement);
        // window.addEventListener( 'resize', onWindowResize, false );


        let gui = new GUI();
        gui.add(this.params, 'exposure', 0, 3);
        gui.add(this.params, 'autoRotate');


        gui.add(this.params, 'roughness', 0, 1);
        gui.add(this.params, 'metalness', 0, 1);
        gui.addColor(this.params, 'color').onChange(colorValue => {
            this.materials.map(material => {
                if (material.frontSide !== undefined) {
                    if (material.frontSide.name === 'metal') {
                        material.frontSide.color = new THREE.Color(colorValue);
                    }
                }
            })
        });

        gui.add(this.params, 'reflectivity', 0, 5);
        gui.add(this.params, 'envMapIntensity', 0, 2);


        gui.add(this.params, 'gemName', ['Sapphire', 'Emerald', 'Ruby', 'Diamond', 'Tourmaline', 'Obsidian']);
        // gui.add(this.params, 'metalName', ['Yellow Gold', 'Rose Gold', 'White Gold']);
        gui.open();

    };

    partAdd = (data, init = false) => {

        // const {data} = this.state;

        let manager = new THREE.LoadingManager();
        let autoRotateStatus = init ? init : this.params.autoRotate;
        this.params.autoRotate = false;

        manager.onProgress = (item, loaded, total) => {
            // console.log(item, loaded, total);

            this.setState({
                itemLoaded: false
            }, () => {
                // autoRotateStatus = init ? init : this.params.autoRotate;
                // console.log(autoRotateStatus);
                // this.params.autoRotate = false;
            })
        };

        manager.onLoad = () => {
            console.log('Loading complete!');
            // console.log(this.objects);

            for (let i = 0, l = this.objects.length; i < l; i++) {
                let object = this.objects[i];
                object.rotation.z = this.rotationValue;
            }

            this.params.autoRotate = autoRotateStatus;
            this.setState({
                itemLoaded: true
            });
        };

        data.map((details, index) => {

            if (init && details.id !== 0) {
                return null;
            }

            //add file to screen
            let loader = new OBJLoader(manager);
            if (details.file) {
                let newFrontMaterial;
                let newBackMaterial;

                if (this.materials.find(material => material.type === details.type)) {
                    this.materials.find(material => {
                        if (material.type === details.type) {
                            if (material.frontSide) newFrontMaterial = material.frontSide;
                            if (material.backSide) newBackMaterial = material.backSide;
                        }
                    });
                } else {
                    if (details.type === 'gem') {
                        newFrontMaterial = this.createMaterial(this.params.gemName, 'front');
                        newBackMaterial = this.createMaterial(this.params.gemName);
                    } else {
                        newFrontMaterial = this.createMaterial(this.params.metalName, 'front');
                    }

                    this.materials.push({type: details.type, frontSide: newFrontMaterial, backSide: newBackMaterial});
                }

                loader.load(`${BASE_MEDIA_API}${details.file}`, object => {

                    // if(object.children.length === 1) {
                    //     object.traverse(child => {
                    //         if (child instanceof THREE.Mesh) {
                    //
                    //             let parent = new THREE.Group();
                    //             parent.name = details;
                    //             child.material = newFrontMaterial;
                    //
                    //             if (newBackMaterial) {
                    //                 let second = child.clone();
                    //                 child.material = newBackMaterial;
                    //                 parent.add(second);
                    //             }
                    //
                    //             parent.add(child);
                    //             this.objects.push(parent);
                    //             this.scene.add(parent);
                    //         }
                    //     });
                    // } else {

                    let parent = new THREE.Group();
                    object.children.map(obj => {
                        obj.traverse(child => {
                            if (child instanceof THREE.Mesh) {

                                parent.name = details.name;
                                child.material = newFrontMaterial;

                                if (newBackMaterial) {
                                    let second = child.clone();
                                    child.material = newBackMaterial;
                                    parent.add(second);
                                }

                                parent.add(child);
                            }
                        });
                    });

                    this.objects.push(parent);
                    this.scene.add(parent);
                    // }

                });
            } else {
                let mainObj = new THREE.Group();
                mainObj.name = details.name;

                details.parts.map(part => {
                    let newFrontMaterial;
                    let newBackMaterial;

                    if (this.materials.find(material => material.type === part.type)) {
                        this.materials.find(material => {
                            if (material.type === part.type) {
                                if (material.frontSide) newFrontMaterial = material.frontSide;
                                if (material.backSide) newBackMaterial = material.backSide;
                            }
                        });
                    } else {
                        if (part.type === 'gem') {
                            newFrontMaterial = this.createMaterial(this.params.gemName, 'front');
                            newBackMaterial = this.createMaterial(this.params.gemName);
                        } else {
                            newFrontMaterial = this.createMaterial(this.params.metalName, 'front');
                        }

                        this.materials.push({type: part.type, frontSide: newFrontMaterial, backSide: newBackMaterial});
                    }

                    loader.load(`${BASE_MEDIA_API}${part.file}`, object => {
                        let parent = new THREE.Group();
                        object.children.map(obj => {
                            obj.traverse(child => {
                                if (child instanceof THREE.Mesh) {

                                    parent.name = part.name;
                                    child.material = newFrontMaterial;

                                    if (newBackMaterial) {
                                        let second = child.clone();
                                        child.material = newBackMaterial;
                                        parent.add(second);
                                    }

                                    parent.add(child);
                                }
                            });
                        });
                        mainObj.add(parent);
                    })
                });

                this.objects.push(mainObj);
                this.scene.add(mainObj);
            }

        });


        let genCubeUrls = (prefix, postfix) => {
            return [
                prefix + 'px' + postfix, prefix + 'nx' + postfix,
                prefix + 'py' + postfix, prefix + 'ny' + postfix,
                prefix + 'pz' + postfix, prefix + 'nz' + postfix
            ];
        };

        //GEMS
        let hdrUrls = genCubeUrls("/data/textures/cube/diamond/", ".hdr");

        new HDRCubeTextureLoader()
            .setDataType(THREE.UnsignedByteType)
            .load(hdrUrls, hdrCubeMap => {
                let pmremGenerator = new PMREMGenerator(hdrCubeMap);
                pmremGenerator.update(this.renderer);
                let pmremCubeUVPacker = new PMREMCubeUVPacker(pmremGenerator.cubeLods);
                pmremCubeUVPacker.update(this.renderer);
                this.hdrCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;

                this.materials.map(material => {
                    if (material.backSide) {
                        // material.frontSide.normalMap =  material.backSide.normalMap = this.hdrCubeRenderTarget.texture;
                        material.frontSide.envMap = material.backSide.envMap = this.hdrCubeRenderTarget.texture;
                        material.frontSide.needsUpdate = material.backSide.needsUpdate = true;
                    } else {
                        // material.frontSide.bumpMap = this.hdrCubeRenderTarget.texture;
                        // material.frontSide.envMap = this.hdrCubeRenderTarget.texture;


                        // material.frontSide.envMap = this.hdrCubeRenderTarget.texture;
                        // material.frontSide.needsUpdate = true;
                    }
                });

                hdrCubeMap.dispose();
                pmremGenerator.dispose();
                pmremCubeUVPacker.dispose();
            });


        //METALS
        let hdrUrls2 = genCubeUrls("/data/textures/cube/yellow_gold/", ".hdr");

        new HDRCubeTextureLoader()
            .setDataType(THREE.UnsignedByteType)
            .load(hdrUrls2, hdrCubeMap => {
                let pmremGenerator = new PMREMGenerator(hdrCubeMap);
                pmremGenerator.update(this.renderer);
                let pmremCubeUVPacker = new PMREMCubeUVPacker(pmremGenerator.cubeLods);
                pmremCubeUVPacker.update(this.renderer);
                this.hdrCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;

                this.materials.map(material => {
                    if (material.backSide) {
                        // material.frontSide.normalMap =  material.backSide.normalMap = this.hdrCubeRenderTarget.texture;
                        // material.frontSide.envMap = material.backSide.envMap = this.hdrCubeRenderTarget.texture;
                        // material.frontSide.needsUpdate = material.backSide.needsUpdate = true;
                    } else {
                        // material.frontSide.bumpMap = this.hdrCubeRenderTarget.texture;
                        material.frontSide.envMap = this.hdrCubeRenderTarget.texture;


                        // material.frontSide.envMap = this.hdrCubeRenderTarget.texture;
                        material.frontSide.needsUpdate = true;
                    }
                });

                hdrCubeMap.dispose();
                pmremGenerator.dispose();
                pmremCubeUVPacker.dispose();
            });

    };

    partReplace = (partName, newPartIndex) => {

        if (newPartIndex) {
            const {data, indexes} = this.state;
            let newPartID = parseInt(newPartIndex);
            // let newPartID = newPartIndex;

            indexes[partName] = newPartIndex;

            this.setState({
                itemLoaded: false
            }, () => {

                this.objects.map(detail => {
                    if (detail.name === partName) {
                        this.scene.remove(detail);
                    }
                });

                this.objects = this.objects.filter(detail => detail.name !== partName);

                // this.partAdd([
                //     data.parts.find(item => item.id === newPartID)
                // ]);

                this.partAdd([
                    data.parts.find(item => item.name === partName && item.id === newPartID)
                ]);

                this.setState(prevState => ({
                    checkboxes: {
                        ...prevState.checkboxes,
                        [partName]: true
                    },
                }))
            });
        }

    };

    createMaterial = (material, side) => {

        if (material === 'Yellow Gold') {
            return new THREE.MeshPhysicalMaterial({
                name: 'metal',
                map: null,
                color: this.params.color,
                // metalness: 1,
                // roughness: 0.15,
                side: THREE.FrontSide,
                // premultipliedAlpha: true,
                // bumpScale: 0.01,
                // skinning: true,
                // emissive: 0xd4af37,
                // emissiveIntensity: 0
                // clearcoat: 1,
                // clearcoatRoughness: 1,
                // refractionRatio: 0.9,

            });
        } else if (material) {
            return new THREE.MeshPhysicalMaterial({
                name: 'gem',
                map: null,
                side: side === 'front' ? THREE.FrontSide : THREE.BackSide,
                transparent: true,
                premultipliedAlpha: true,
                // refractionRatio: 0.9,
                // lightMapIntensity: 1
                // clearcoat: 0,
                // clearcoatRoughness: 0
            });
        } else
            return null;
    };

    allMaterials = (materialName, side) => {

        let front = side === 'front';

        switch (materialName) {
            case 'Yellow Gold':
                return {
                    name: 'metal',
                    color: new THREE.Color(0xd4af37),
                    envMapIntensity: 0.8,
                    roughness: 0.2,
                    metalness: 1
                };
            case 'Rose Gold':
                return {
                    name: 'metal',
                    color: new THREE.Color(0xb76e79),
                    envMapIntensity: 1,
                    roughness: 0.2,
                    metalness: 1
                };
            case 'White Gold':
                return {
                    name: 'metal',
                    color: new THREE.Color(0xbba58e),
                    envMapIntensity: 1,
                    roughness: 0.2,
                    metalness: 1
                };
            case 'Sapphire':
                return {
                    name: 'gem',
                    color: new THREE.Color(0x0f52ba),
                    opacity: front ? 0.7 : 0.8,
                    metalness: front ? 0.3 : 0.3,
                    roughness: front ? 0.1 : 0.2,
                    envMapIntensity: 5,
                    reflectivity: 1.5
                };
            case 'Emerald':
                return {
                    name: 'gem',
                    color: new THREE.Color(0x50c878),
                    opacity: front ? 0.8 : 0.8,
                    metalness: front ? 1 : 0.7,
                    roughness: front ? 0.2 : 0.3,
                    envMapIntensity: 5,
                    reflectivity: 1
                };
            case 'Ruby':
                return {
                    name: 'gem',
                    color: new THREE.Color(0xe0112b),
                    opacity: front ? 0.6 : 0.7,
                    metalness: front ? 0.3 : 0.6,
                    roughness: front ? 0.1 : 0.2,
                    envMapIntensity: 5,
                    reflectivity: 0.5
                };
            case 'Diamond':
                return {
                    name: 'gem',
                    color: new THREE.Color(0xffffff),
                    opacity: front ? 0.7 : 0.7,
                    metalness: front ? 0.5 : 1,
                    roughness: front ? 0 : 0,
                    envMapIntensity: 5,
                    reflectivity: 3.3
                };
            case 'Tourmaline':
                return {
                    name: 'gem',
                    color: new THREE.Color(0x142d36),
                    opacity: front ? 0.8 : 0.8,
                    metalness: front ? 1 : 0.7,
                    roughness: front ? 0.2 : 0.3,
                    envMapIntensity: 5,
                    reflectivity: 1
                };
            case 'Obsidian':
                return {
                    name: 'gem',
                    color: new THREE.Color(0x2e3134),
                    opacity: front ? 1 : 1,
                    metalness: front ? 0 : 0.7,
                    roughness: front ? 0 : 0.4,
                    envMapIntensity: 5,
                    reflectivity: 0.5
                };
        }
    };

    animate = () => {
        this.stats.begin();
        this.renderIt();
        this.stats.end();
        requestAnimationFrame(this.animate);
    };

    renderIt = () => {

        this.materials.map(material => {
            if (material.frontSide !== undefined) {
                if (material.frontSide.name === 'metal') {
                    let newFrontParams = this.allMaterials(this.params.metalName, 'front');
                    // material.frontSide.color = newFrontParams.color;
                    // material.frontSide.metalness = newFrontParams.metalness;
                    // material.frontSide.roughness = newFrontParams.roughness;
                    // material.frontSide.envMapIntensity = newFrontParams.envMapIntensity;

                    material.frontSide.metalness = this.params.metalness;
                    material.frontSide.roughness = this.params.roughness;
                    material.frontSide.envMapIntensity = this.params.envMapIntensity;
                    material.frontSide.opacity = this.params.opacity;
                    material.frontSide.reflectivity = this.params.reflectivity;
                }

                if (material.frontSide.name === 'gem') {
                    let newFrontParams = this.allMaterials(this.params.gemName, 'front');
                    material.frontSide.color = newFrontParams.color;
                    material.frontSide.opacity = newFrontParams.opacity;
                    material.frontSide.metalness = newFrontParams.metalness;
                    material.frontSide.roughness = newFrontParams.roughness;
                    material.frontSide.reflectivity = newFrontParams.reflectivity;
                    material.frontSide.envMapIntensity = newFrontParams.envMapIntensity;

                    if (material.backSide !== undefined) {
                        let newBackParams = this.allMaterials(this.params.gemName, 'back');
                        material.backSide.color = newBackParams.color;
                        material.backSide.opacity = newBackParams.opacity;
                        material.backSide.metalness = newBackParams.metalness;
                        material.backSide.roughness = newBackParams.roughness;
                        material.backSide.reflectivity = newBackParams.reflectivity;
                        material.backSide.envMapIntensity = newBackParams.envMapIntensity;
                    }
                }
            }
        });

        this.renderer.toneMappingExposure = this.params.exposure;

        this.camera.lookAt(this.scene.position);
        if (this.params.autoRotate) {
            for (let i = 0, l = this.objects.length; i < l; i++) {
                let object = this.objects[i];
                object.rotation.z += 0.005;
            }
            if (this.objects[0]) {
                this.rotationValue = this.objects[0].rotation.z;
            }
        }
        this.renderer.render(this.scene, this.camera);

        // let t = ( Date.now() / 2000 );
        // let r = 30;
        // let lx = r * Math.cos(t);
        // let lz = 5.0 + 5.0 * Math.sin( t / 3.0 ); //r * Math.sin(t);
        // let ly = r * Math.sin(t);
        // this.rectLightButtom.lookAt(this.origin);
        // this.rectLightButtom1.lookAt(this.origin);
        // this.rectLightButtom2.lookAt(this.origin);
        // this.rectLight.position.set( lx, ly, lz );
        this.rectLight1.lookAt(this.origin);
        this.rectLight2.lookAt(this.origin);
        this.rectLight3.lookAt(this.origin);
    };

    partVisibilityToggle = (value, partName) => {

        this.setState(prevState => ({
            checkboxes: {
                ...prevState.checkboxes,
                [partName]: value,
            },
        }), () => {
            this.objects.map(detail => {
                if (detail.name === partName) {
                    detail.traverse(child => {
                        if (child instanceof THREE.Mesh) {
                            child.visible = value;
                        }
                    })
                }
            })
        });

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



    selectFile = evt => {

        let files = evt.target.files;

        //Clean All
        this.objects.map(detail => {
            this.scene.remove(detail);
        });
        this.objects = [];

        for (let i = 0, f; f = files[i]; i++) {
            let reader = new FileReader();

            reader.onload = (file => {
                return e => {
                    // console.log(e.target.result);
                    this.partAddLocal([
                            {
                                "id": 0,
                                "name": "shank",
                                "type": "metal",
                                "file": e.target.result
                            }
                        ]);
                };
            })(f);

            // reader.readAsDataURL(f);
            reader.readAsBinaryString(f);
        }
    };

    partAddLocal = (data, init = false) => {

        // const {data} = this.state;

        let manager = new THREE.LoadingManager();
        let autoRotateStatus = init ? init : this.params.autoRotate;
        this.params.autoRotate = false;

        manager.onProgress = (item, loaded, total) => {
            // console.log(item, loaded, total);

            this.setState({
                itemLoaded: false
            }, () => {
                // autoRotateStatus = init ? init : this.params.autoRotate;
                // console.log(autoRotateStatus);
                // this.params.autoRotate = false;
            })
        };

        manager.onLoad = () => {
            console.log('Loading complete!');
            // console.log(this.objects);

            for (let i = 0, l = this.objects.length; i < l; i++) {
                let object = this.objects[i];
                object.rotation.z = this.rotationValue;
            }

            this.params.autoRotate = autoRotateStatus;
            this.setState({
                itemLoaded: true
            });
        };

        data.map((details, index) => {

            let objstring = details.file;

            if (init && details.id !== 0) {
                return null;
            }

            //add file to screen
            let loader = new OBJLoader(manager);
            if (details.file) {
                let newFrontMaterial;
                let newBackMaterial;

                if (this.materials.find(material => material.type === details.type)) {
                    this.materials.find(material => {
                        if (material.type === details.type) {
                            if (material.frontSide) newFrontMaterial = material.frontSide;
                            if (material.backSide) newBackMaterial = material.backSide;
                        }
                    });
                } else {
                    if (details.type === 'gem') {
                        newFrontMaterial = this.createMaterial(this.params.gemName, 'front');
                        newBackMaterial = this.createMaterial(this.params.gemName);
                    } else {
                        newFrontMaterial = this.createMaterial(this.params.metalName, 'front');
                    }

                    this.materials.push({type: details.type, frontSide: newFrontMaterial, backSide: newBackMaterial});
                }

                loader.load = function load( url, localText, onLoad, onProgress, onError ) {
                    let scope = this;
                    let loader = new THREE.XHRLoader( scope.manager );
                    loader.setPath( this.path );
                    loader.load( url, function ( text ) {
                        if (url === ""){
                            text = localText;
                        }
                        onLoad( scope.parse( text ) );
                    }, onProgress, onError );
                };

                loader.load('', objstring, object => {

                    // if(object.children.length === 1) {
                    //     object.traverse(child => {
                    //         if (child instanceof THREE.Mesh) {
                    //
                    //             let parent = new THREE.Group();
                    //             parent.name = details;
                    //             child.material = newFrontMaterial;
                    //
                    //             if (newBackMaterial) {
                    //                 let second = child.clone();
                    //                 child.material = newBackMaterial;
                    //                 parent.add(second);
                    //             }
                    //
                    //             parent.add(child);
                    //             this.objects.push(parent);
                    //             this.scene.add(parent);
                    //         }
                    //     });
                    // } else {

                    let parent = new THREE.Group();
                    object.children.map(obj => {
                        obj.traverse(child => {
                            if (child instanceof THREE.Mesh) {

                                parent.name = details.name;
                                child.material = newFrontMaterial;

                                if (newBackMaterial) {
                                    let second = child.clone();
                                    child.material = newBackMaterial;
                                    parent.add(second);
                                }

                                parent.add(child);
                            }
                        });
                    });

                    this.objects.push(parent);
                    this.scene.add(parent);
                    // }

                });
            } else {
                let mainObj = new THREE.Group();
                mainObj.name = details.name;

                details.parts.map(part => {
                    let newFrontMaterial;
                    let newBackMaterial;

                    if (this.materials.find(material => material.type === part.type)) {
                        this.materials.find(material => {
                            if (material.type === part.type) {
                                if (material.frontSide) newFrontMaterial = material.frontSide;
                                if (material.backSide) newBackMaterial = material.backSide;
                            }
                        });
                    } else {
                        if (part.type === 'gem') {
                            newFrontMaterial = this.createMaterial(this.params.gemName, 'front');
                            newBackMaterial = this.createMaterial(this.params.gemName);
                        } else {
                            newFrontMaterial = this.createMaterial(this.params.metalName, 'front');
                        }

                        this.materials.push({type: part.type, frontSide: newFrontMaterial, backSide: newBackMaterial});
                    }

                    loader.load(`${part.file}`, object => {
                        let parent = new THREE.Group();
                        object.children.map(obj => {
                            obj.traverse(child => {
                                if (child instanceof THREE.Mesh) {

                                    parent.name = part.name;
                                    child.material = newFrontMaterial;

                                    if (newBackMaterial) {
                                        let second = child.clone();
                                        child.material = newBackMaterial;
                                        parent.add(second);
                                    }

                                    parent.add(child);
                                }
                            });
                        });
                        mainObj.add(parent);
                    })
                });

                this.objects.push(mainObj);
                this.scene.add(mainObj);
            }

        });


        let genCubeUrls = (prefix, postfix) => {
            return [
                prefix + 'px' + postfix, prefix + 'nx' + postfix,
                prefix + 'py' + postfix, prefix + 'ny' + postfix,
                prefix + 'pz' + postfix, prefix + 'nz' + postfix
            ];
        };

        //GEMS
        let hdrUrls = genCubeUrls("/data/textures/cube/diamond/", ".hdr");

        new HDRCubeTextureLoader()
            .setDataType(THREE.UnsignedByteType)
            .load(hdrUrls, hdrCubeMap => {
                let pmremGenerator = new PMREMGenerator(hdrCubeMap);
                pmremGenerator.update(this.renderer);
                let pmremCubeUVPacker = new PMREMCubeUVPacker(pmremGenerator.cubeLods);
                pmremCubeUVPacker.update(this.renderer);
                this.hdrCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;

                this.materials.map(material => {
                    if (material.backSide) {
                        // material.frontSide.normalMap =  material.backSide.normalMap = this.hdrCubeRenderTarget.texture;
                        material.frontSide.envMap = material.backSide.envMap = this.hdrCubeRenderTarget.texture;
                        material.frontSide.needsUpdate = material.backSide.needsUpdate = true;
                    } else {
                        // material.frontSide.bumpMap = this.hdrCubeRenderTarget.texture;
                        // material.frontSide.envMap = this.hdrCubeRenderTarget.texture;


                        // material.frontSide.envMap = this.hdrCubeRenderTarget.texture;
                        // material.frontSide.needsUpdate = true;
                    }
                });

                hdrCubeMap.dispose();
                pmremGenerator.dispose();
                pmremCubeUVPacker.dispose();
            });


        //METALS
        let hdrUrls2 = genCubeUrls("/data/textures/cube/yellow_gold/", ".hdr");

        new HDRCubeTextureLoader()
            .setDataType(THREE.UnsignedByteType)
            .load(hdrUrls2, hdrCubeMap => {
                let pmremGenerator = new PMREMGenerator(hdrCubeMap);
                pmremGenerator.update(this.renderer);
                let pmremCubeUVPacker = new PMREMCubeUVPacker(pmremGenerator.cubeLods);
                pmremCubeUVPacker.update(this.renderer);
                this.hdrCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;

                this.materials.map(material => {
                    if (material.backSide) {
                        // material.frontSide.normalMap =  material.backSide.normalMap = this.hdrCubeRenderTarget.texture;
                        // material.frontSide.envMap = material.backSide.envMap = this.hdrCubeRenderTarget.texture;
                        // material.frontSide.needsUpdate = material.backSide.needsUpdate = true;
                    } else {
                        // material.frontSide.bumpMap = this.hdrCubeRenderTarget.texture;
                        material.frontSide.envMap = this.hdrCubeRenderTarget.texture;


                        // material.frontSide.envMap = this.hdrCubeRenderTarget.texture;
                        material.frontSide.needsUpdate = true;
                    }
                });

                hdrCubeMap.dispose();
                pmremGenerator.dispose();
                pmremCubeUVPacker.dispose();
            });

    };

    render() {
        const {data, itemLoaded, indexes, checkboxes} = this.state;

        return (
            <div className='page page-item'>

                <div className='canvas-wrapper'>
                    <Loader className={`loader-svg absolute ${!itemLoaded ? 'visible' : 'hidden'}`}/>

                    <div className={itemLoaded ? 'canvas show' : 'canvas'} style={{height: 500}}
                         ref={ref => (this.el = ref)}/>
                    <ThreeDRotationIcon className='d-text'/>
                </div>


                <div className={`toolbar`}>
                    {indexes && Object.keys(indexes).map((item, groupIndex) => (
                        <FormControlLabel
                            key={groupIndex}
                            label={item}
                            labelPlacement="end"
                            control={
                                <Checkbox
                                    color="primary"
                                    disabled={!itemLoaded}
                                    checked={checkboxes[item]}
                                    onChange={(e) => this.partVisibilityToggle(e.target.checked, item)}
                                />
                            }
                        />
                    ))}


                    {indexes && Object.keys(indexes).map((item, groupIndex) => (
                            <ToggleButtonGroup
                                key={groupIndex}
                                value={indexes[item]}
                                exclusive
                                onChange={(event, val) => this.partReplace(item, val)}
                                // aria-label="text alignment"
                            >
                                {
                                    data && data.parts.filter(detail => detail.name === item).length > 1 && (
                                        data.parts.map((detail, i) => (
                                            detail.name === item && (
                                                <ToggleButton key={i}
                                                              disabled={!itemLoaded}
                                                              value={`${detail.id ? detail.id : '0'}`}
                                                              aria-label={`${detail.id}`}
                                                >
                                                    {`${item} ${detail.id !== undefined ? detail.id + 1 : '1'}`}
                                                </ToggleButton>
                                            )
                                        ))
                                    )
                                }
                            </ToggleButtonGroup>
                        )
                    )}

                    <form action=''>
                        <input id="file-input" type="file" name="name" onChange={this.selectFile} multiple/>
                        {/*<Button color="inherit" type='submit'>*/}
                            {/*Upload*/}
                        {/*</Button>*/}
                    </form>

                </div>
            </div>
        )
    }
}


export default Item;
