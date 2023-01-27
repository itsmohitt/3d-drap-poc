import "./App.css";
import {Layout, Spin, Typography} from "antd";
import ThreeDModalRenderer from "./components/ThreeDModalRenderer";
import {useState,Suspense} from "react";

const { Title } = Typography;
export default function App() {
    const [selectedModel,setSelectedModel] = useState('dress.obj');
  return (
      <Layout >
        <Title align="center">3D Model Drapping POC</Title>
          <Suspense fallback={<Spin/>}>
            <ThreeDModalRenderer selectedModel={selectedModel} setSelectedModel={setSelectedModel}/>
          </Suspense>
      </Layout>
  );
}