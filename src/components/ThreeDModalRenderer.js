import React, {Suspense, useEffect, useState} from "react";
import {Button, Card, Checkbox, Col, Radio, Row, Slider, Typography} from "antd";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {Canvas, useLoader} from "@react-three/fiber";
import {ContactShadows, Html, OrbitControls, useProgress} from "@react-three/drei";
import {RepeatWrapping, TextureLoader} from "three";

const imageList = ['theprintscompany.6b5c311c-efaf-4d9e-8083-35fecd2f8355.jpeg',
    'theprintscompany.52fdc227-08b2-485e-ba0d-78a71c08dbf3.jpeg',
    'theprintscompany.791b8d38-444c-4175-b276-5adb1d76b4f2.jpeg',
    'theprintscompany.2472dd73-b323-44c3-80bc-1437963dd1ce.jpeg',
    'theprintscompany.40226e32-a522-47b0-aef0-5b262125e62f.jpeg',
    'theprintscompany.2231987b-6983-447b-8c02-ab162a1b11ef.jpeg',
    'theprintscompany.19937179-369d-43e0-aa89-e85dd43f8894.jpeg',
    'theprintscompany.d710e4d9-2039-4e19-8e9d-a1b7678b31fe.jpeg',
    '08364a96-f038-4082-8b4a-c906cf66bf16.jpeg',
    'b90b9e01-49c7-4459-b607-a9cc4b4721f6.jpeg',
    'c3aa7a71-e0cb-44ec-a491-3c5119cb3f83.jpeg',
    'c72cfe94-7ec4-4bb0-8e3a-a5615b53d000.jpeg']
export default function ThreeDModalRenderer(props) {
    const [objChildren, setObjChildren] = useState([]);
    const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.5);
    const [patternXOffset, setPatternXOffset] = useState(0);
    const [patternYOffset, setPatternYOffset] = useState(0);
    const [patternRotation, setPatternRotation] = useState(0);
    const [textureRatio, setTextureRatio] = useState(10);
    const [wireframeState, setWireframeState] = useState(false);
    const [selectedChildNode, setSelectedChildNode] = useState(null)
    const [selectedTextureImage, setSelectedTextureImage] = useState("c72cfe94-7ec4-4bb0-8e3a-a5615b53d000.jpeg")
    const obj = useLoader(OBJLoader, '/' + props.selectedModel)
    useEffect(() => {
        let children = []
        obj.traverse(function (child) {
            children.push(child)
        })
        setObjChildren(children);
    }, [obj,props.selectedModel]);
    const spotLightPosition = [0, 1000, 100];

    return (
        <div className="main-container">
            <Row>
                <Col span={24}>
                    <Typography level={5}>Select Model</Typography>
                    <Radio.Group
                        onChange={(e)=>props.setSelectedModel(e.target.value)}
                        options={modelList}
                        value={props.selectedModel}
                        optionType="button"
                        buttonStyle="solid" style={{
                            display:'block',
                    margin:"auto",
                    marginBottom:8
                    }}/>
                    <Card>
                        {imageList.map(image => <Card.Grid style={{
                            width: `${100 / imageList.length}%`,
                            background: image === selectedTextureImage ? "#0066ff" : "white",
                            padding: 8
                        }}
                                                           onClick={() => setSelectedTextureImage(image)}>
                            <img src={"/" + image} alt="" style={{width: '100%'}}/>
                        </Card.Grid>)}
                    </Card>
                </Col>
                <Col span={4}>
                    <Typography>Ambient Light</Typography>
                    <Slider step={0.1} min={0.1} max={1} value={ambientLightIntensity}
                            onChange={(value) => setAmbientLightIntensity(value)}/>
                    <Typography>Pattern Size</Typography>
                    <Slider step={0.01} min={0.01} max={1} value={textureRatio}
                            onChange={(value) => setTextureRatio(value)}/>

                    <Typography>Pattern Position</Typography>
                    <Slider step={1} min={0} max={100} value={patternXOffset}
                            onChange={(value) => setPatternXOffset(value)}/>
                    <Slider step={1} min={0} max={100} value={patternYOffset}
                            onChange={(value) => setPatternYOffset(value)}/>
                    <Typography>Rotation (Degree)</Typography>
                    <Slider step={1} min={0} max={360} value={patternRotation}
                            onChange={(value) => setPatternRotation(value)}/>
                    <Checkbox checked={wireframeState}
                              onChange={(e) => setWireframeState(e.target.checked)}>Wireframe</Checkbox>

                </Col>
                <Col span={16}>
                    <Canvas style={{height: '500px', width: '100%'}}>
                        <spotLight
                            intensity={0.6}
                            angle={0.5}
                            penumbra={1}
                            position={spotLightPosition}
                        />
                        {/*<mesh position={[3, -1, -2]}>*/}
                        {/*    <boxGeometry args={[2, 2, 2]}/>*/}
                        {/*    <MeshMaterial image={selectedTextureImage} ratio={textureRatio}*/}
                        {/*                  wireframeState={wireframeState} patternXOffset={patternXOffset}*/}
                        {/*                  patternYOffset={patternYOffset} patternRotation={patternRotation}/>*/}
                        {/*</mesh>*/}
                        <mesh position={[0, -4, 0]} scale={0.04} color={"red"}>
                            <ambientLight intensity={ambientLightIntensity}/>


                            {/*<mesh position={spotLightPosition}>*/}
                            {/*    <boxGeometry />*/}
                            {/*    <meshStandardMaterial />*/}
                            {/*</mesh>*/}
                            <OrbitControls makeDefault minPolarAngle={Math.PI / 2}
                                           maxPolarAngle={Math.PI / 2}
                            />
                            <Suspense fallback={<Loader/>}>
                                {/*<primitive object={obj} />*/}
                                {objChildren.map((item, index) => <mesh geometry={item.geometry} color={""}>
                                    <MeshMaterial image={selectedTextureImage} ratio={textureRatio}
                                                  wireframeState={wireframeState}
                                                  selectedChild={index === selectedChildNode}
                                                  patternXOffset={patternXOffset} patternYOffset={patternYOffset}
                                                  patternRotation={patternRotation}/>
                                </mesh>)}
                                <ContactShadows
                                    rotation-x={Math.PI / 2}
                                    position={[0, -0.8, 0]}
                                    opacity={1}
                                    width={10000}
                                    height={10000}
                                    blur={2}
                                    far={1}
                                />

                            </Suspense>
                        </mesh>
                        {/*<primitive*/}
                        {/*    object={gltf.scene}*/}
                        {/*/>*/}
                    </Canvas>
                </Col>
                <Col span={4}>
                    <Row justify={"space-around"} gutter={[16, 16]}>
                        {objChildren.map((item, index) => <Col span={6}><Button
                            type={index === selectedChildNode ? "primary" : 'default'}
                            onClick={() => setSelectedChildNode(index)}>{index}</Button></Col>)}
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

function Loader() {
    const {progress} = useProgress()
    return <Html center>{progress} % loaded</Html>
}

function MeshMaterial(props) {
    const texture = useLoader(TextureLoader, '/' + props.image);
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(props.ratio, props.ratio);
    texture.offset.set(props.patternXOffset / 100, props.patternYOffset / 100);
    texture.rotation = props.patternRotation * (Math.PI / 180);
    return <meshPhongMaterial attach="material" map={texture}
                              wireframe={props.wireframeState}
                              color={props.selectedChild ? "#0066ff" : "white"}/>
}

const modelList = [{
    label: 'Dress',
    value: 'dress.obj'
},{
    label: 'Shirt',
    value:'shirt.obj'
// },{
//     label: 'Tshirt',
//     value : 'tshirt.obj'
// },{
//     label: 'Gown',
//     value : 'gown.obj'
}, {
    label: 'Hoodie',
    value : 'hoodie.obj'
}]