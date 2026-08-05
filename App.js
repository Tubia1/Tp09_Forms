import { StatusBar } from 'expo-status-bar';
import InscripcionTorneo from '../pantallas/InscripcionTorneo';

export default function App() {
  return (
    <>
      <InscripcionTorneo />
      <StatusBar style="auto" />
    </>
  );
}