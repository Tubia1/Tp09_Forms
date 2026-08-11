import { Pressable, StyleSheet, Text } from 'react-native';

export default function BotonConfirmacion({ deshabilitado, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: deshabilitado }}
      disabled={deshabilitado}
      onPress={onPress}
      style={({ pressed }) => [
        styles.boton,
        deshabilitado && styles.botonDeshabilitado,
        pressed && !deshabilitado && styles.botonPresionado,
      ]}
    >
      <Text
        style={[
          styles.texto,
          deshabilitado && styles.textoDeshabilitado,
        ]}
      >
        Confirmar inscripción
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    alignItems: 'center',
    backgroundColor: '#ff4655',
    borderRadius: 6,
    paddingVertical: 16,
  },
  botonDeshabilitado: {
    backgroundColor: '#34404b',
  },
  botonPresionado: {
    opacity: 0.8,
  },
  texto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  textoDeshabilitado: {
    color: '#7f8a95',
  },
});
