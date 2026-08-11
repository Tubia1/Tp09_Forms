import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CampoFormulario from '../componentes/CampoFormulario';

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

          <View style={styles.grupoCategoria}>
            <Text style={styles.etiqueta}>Categoría</Text>
            <View style={styles.categorias}>
              {['Sub-16', 'Libre'].map((categoria) => {
                const seleccionada = formulario.categoria === categoria;

                return (
                  <Pressable
                    key={categoria}
                    accessibilityRole="button"
                    accessibilityState={{ selected: seleccionada }}
                    onPress={() => actualizarCampo('categoria', categoria)}
                    style={({ pressed }) => [
                      styles.botonCategoria,
                      seleccionada && styles.botonCategoriaSeleccionado,
                      pressed && styles.botonPresionado,
                    ]}
                  >
                    <Text
                      style={[
                        styles.textoCategoria,
                        seleccionada && styles.textoCategoriaSeleccionado,
                      ]}
                    >
                      {categoria}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {Object.values(interactuados).some(Boolean) && errores.categoria ? (
              <Text style={styles.error}>{errores.categoria}</Text>
            ) : null}
          </View>

          <Pressable
            accessibilityRole="button"
            disabled={!formularioValido}
            onPress={confirmarInscripcion}
            style={({ pressed }) => [
              styles.botonConfirmar,
              !formularioValido && styles.botonConfirmarDeshabilitado,
              pressed && formularioValido && styles.botonPresionado,
            ]}
          >
            <Text
              style={[
                styles.textoConfirmar,
                !formularioValido && styles.textoConfirmarDeshabilitado,
              ]}
            >
              Confirmar inscripción
            </Text>
          </Pressable>
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
  grupoCategoria: {
    marginBottom: 24,
  },
  etiqueta: {
    color: '#f5f5f5',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  categorias: {
    flexDirection: 'row',
    gap: 12,
  },
  botonCategoria: {
    flex: 1,
    alignItems: 'center',
    borderColor: '#53606d',
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: 13,
  },
  botonCategoriaSeleccionado: {
    backgroundColor: '#ff4655',
    borderColor: '#ff4655',
  },
  textoCategoria: {
    color: '#c8d0d8',
    fontSize: 15,
    fontWeight: '700',
  },
  textoCategoriaSeleccionado: {
    color: '#ffffff',
  },
  error: {
    color: '#ff7580',
    fontSize: 13,
    marginTop: 6,
  },
  botonConfirmar: {
    alignItems: 'center',
    backgroundColor: '#ff4655',
    borderRadius: 6,
    paddingVertical: 16,
  },
  botonConfirmarDeshabilitado: {
    backgroundColor: '#34404b',
  },
  textoConfirmar: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  textoConfirmarDeshabilitado: {
    color: '#7f8a95',
  },
  botonPresionado: {
    opacity: 0.8,
  },
});
