import { Layout } from './components/Layout';
import { FlowEditorWrapper } from './components/FlowEditor';
import { ConfigPanel } from './components/ConfigPanel';
import { CopilotChat } from './components/CopilotChat';

function App() {
  return (
    <Layout>
      <div className="relative w-full h-full">
        <FlowEditorWrapper />
        <ConfigPanel />
        <CopilotChat />
      </div>
    </Layout>
  );
}

export default App;
