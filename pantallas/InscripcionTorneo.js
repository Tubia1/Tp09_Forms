import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CampoFormulario from '../componentes/CampoFormulario';
import SelectorCategoria from '../componentes/SelectorCategoria';
import BotonConfirmacion from '../componentes/BotonConfirmacion';

const CAMPOS_INICIALES = {
  nombreEquipo: false,
  nombreCapitan: false,
  email: false,
  telefono: false,
  categoria: false,
};

const validarFormulario = (formulario) => {
  const errores = {};
  const nombreEquipo = formulario.nombreEquipo.trim();
  const nombreCapitan = formulario.nombreCapitan.trim();
  const email = formulario.email.trim();
  const telefono = formulario.telefono.trim();

  if (!nombreEquipo) {
    errores.nombreEquipo = 'El nombre del equipo es obligatorio.';
  } else if (nombreEquipo.length < 3 || nombreEquipo.length > 20) {
    errores.nombreEquipo = 'Debe tener entre 3 y 20 caracteres.';
  }

  if (!nombreCapitan) {
    errores.nombreCapitan = 'El nombre del capitán es obligatorio.';
  }

  if (!email) {
    errores.email = 'El email es obligatorio.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errores.email = 'Ingresá un email válido, por ejemplo equipo@email.com.';
  }

  if (!telefono) {
    errores.telefono = 'El teléfono es obligatorio.';
  } else if (!/^\d+$/.test(telefono)) {
    errores.telefono = 'El teléfono solo puede contener números.';
  }

  if (!['Sub-16', 'Libre'].includes(formulario.categoria)) {
    errores.categoria = 'Seleccioná una categoría.';
  }

  return errores;
};

export default function InscripcionTorneo() {
  const [formulario, setFormulario] = useState({
    nombreEquipo: '',
    nombreCapitan: '',
    email: '',
    telefono: '',
    categoria: '',
  });
  const [interactuados, setInteractuados] = useState(CAMPOS_INICIALES);

  const actualizarCampo = (campo, valor) => {
    setFormulario({
      ...formulario,
      [campo]: valor,
    });
    setInteractuados({
      ...interactuados,
      [campo]: true,
    });
  };

  const marcarInteractuado = (campo) => {
    setInteractuados({
      ...interactuados,
      [campo]: true,
    });
  };

  const errores = validarFormulario(formulario);
  const formularioValido = Object.keys(errores).length === 0;

  const confirmarInscripcion = () => {
    Alert.alert(
      'Inscripción confirmada',
      `El equipo ${formulario.nombreEquipo.trim()} fue inscripto correctamente en Valorant.`,
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.pantalla}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.contenido}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.encabezado}>
          <Text style={styles.juego}>VALORANT</Text>
          <Text style={styles.titulo}>Inscripción al torneo</Text>
          <Text style={styles.descripcion}>
            Completá los datos de tu equipo para competir.
          </Text>
        </View>

        <View style={styles.formulario}>
          <CampoFormulario
            etiqueta="Nombre del equipo"
            valor={formulario.nombreEquipo}
            onChangeText={(valor) => actualizarCampo('nombreEquipo', valor)}
            onBlur={() => marcarInteractuado('nombreEquipo')}
            keyboardType="default"
            error={interactuados.nombreEquipo ? errores.nombreEquipo : undefined}
            placeholder="Ej: Radiant Five"
          />
          <CampoFormulario
            etiqueta="Nombre del capitán"
            valor={formulario.nombreCapitan}
            onChangeText={(valor) => actualizarCampo('nombreCapitan', valor)}
            onBlur={() => marcarInteractuado('nombreCapitan')}
            keyboardType="default"
            error={interactuados.nombreCapitan ? errores.nombreCapitan : undefined}
            placeholder="Nombre y apellido"
          />
          <CampoFormulario
            etiqueta="Email"
            valor={formulario.email}
            onChangeText={(valor) => actualizarCampo('email', valor)}
            onBlur={() => marcarInteractuado('email')}
            keyboardType="email-address"
            autoCapitalize="none"
            error={interactuados.email ? errores.email : undefined}
            placeholder="equipo@email.com"
          />
          <CampoFormulario
            etiqueta="Teléfono"
            valor={formulario.telefono}
            onChangeText={(valor) => actualizarCampo('telefono', valor)}
            onBlur={() => marcarInteractuado('telefono')}
            keyboardType="phone-pad"
            error={interactuados.telefono ? errores.telefono : undefined}
            placeholder="Solo números"
          />

          <SelectorCategoria
            valor={formulario.categoria}
            onChange={(categoria) => actualizarCampo('categoria', categoria)}
            error={
              Object.values(interactuados).some(Boolean)
                ? errores.categoria
                : undefined
            }
          />

          <BotonConfirmacion
            deshabilitado={!formularioValido}
            onPress={confirmarInscripcion}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#0f1923',
  },
  contenido: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
  },
  encabezado: {
    marginBottom: 28,
  },
  juego: {
    color: '#ff4655',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 4,
    marginBottom: 8,
  },
  titulo: {
    color: '#f5f5f5',
    fontSize: 30,
    fontWeight: '800',
  },
  descripcion: {
    color: '#a9b2bc',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  formulario: {
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
});
