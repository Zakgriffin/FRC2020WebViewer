import React, {useRef, Suspense, useEffect} from 'react'
import {extend, Canvas, useThree, useLoader} from 'react-three-fiber'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import './App.css'

extend({OrbitControls})

const App: React.FC = () => {
    return <Canvas>
        <Scene/>
    </Canvas>
}

function Scene() {
    const orbit = useRef<JSX.IntrinsicElements['orbitControls']>()
    const {camera, gl} = useThree()

    useEffect(() => {
        camera.position.set(240, 100, 0)
        orbit.current.target.set(150, 0, 0)
        orbit.current.update()
    }, [camera])

    return <>
        <Suspense fallback={
            <mesh visible position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry attach='geometry' args={[649, 319, 1]}/>
                <meshBasicMaterial attach='material' color='gray'/>
            </mesh>
        }>
            <Asset
                url='/field.glb'
                other={{
                    scale: [30, 30, 30]
                }}
            />
        </Suspense>

        <orbitControls ref={orbit}
            args={[camera, gl.domElement]}
            enableDamping
            dampingFactor={0.4}
            rotateSpeed={1}
            maxPolarAngle={Math.PI / 2 - 0.1}
            minDistance={10}
            maxDistance={400}
            height={200}
        />

        <Lights
            type='AmbientLight'
            color={0xffffff}
            intensity={0.8}
            position={[0, 0, 0]}
        />
    </>
}

function Asset(props: {url: string, other: any}) {
    const gltf = useLoader(GLTFLoader, props.url)
    return <primitive {...props.other} object={gltf.scene}/>
}

function Lights(props: any) {
    const {type} = props
    const Light = type
    return <Light {...props} />
}

export default App