import "./App.css";
import { Divider, Layout, Typography } from "antd";
import ThreeDModalRenderer from "./components/ThreeDModalRenderer";

const { Title } = Typography;
export default function App() {
  return (
      <Layout >
        <Title align="center">3D Model Drapping POC</Title>
        <ThreeDModalRenderer />
      </Layout>
  );
}