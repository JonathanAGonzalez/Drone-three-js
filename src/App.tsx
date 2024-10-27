import { CanvasLayout } from './components/layout/canva.layout';
import { Container } from './components/layout/container.layout';
import { TextInformation } from './components/text-information.component';
import { DroneV2 } from './components/drone-v2.component';
import { CustomizerLayout } from './components/customizer.component';

function App() {
  return (
    <Container>
      <TextInformation />
      <CustomizerLayout />
      <CanvasLayout>
        <DroneV2 />
      </CanvasLayout>
    </Container>
  );
}

export default App;
