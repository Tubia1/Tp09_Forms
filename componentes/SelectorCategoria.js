import { Pressable, StyleSheet, Text, View } from 'react-native';

const CATEGORIAS = ['Sub-16', 'Libre'];

export default function SelectorCategoria({ valor, onChange, error }) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>Categoría</Text>
      <View style={styles.opciones}>
        {CATEGORIAS.map((categoria) => {
          const seleccionada = valor === categoria;

          return (
            <Pressable
              key={categoria}
              accessibilityRole="button"
              accessibilityState={{ selected: seleccionada }}
              onPress={() => onChange(categoria)}
              style={({ pressed }) => [
                styles.boton,
                seleccionada && styles.botonSeleccionado,
                pressed && styles.botonPresionado,
              ]}
            >
              <Text
                style={[
                  styles.texto,
                  seleccionada && styles.textoSeleccionado,
                ]}
              >
                {categoria}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginBottom: 24,
  },
  etiqueta: {
    color: '#f5f5f5',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  opciones: {
    flexDirection: 'row',
    gap: 12,
  },
  boton: {
    flex: 1,
    alignItems: 'center',
    borderColor: '#53606d',
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: 13,
  },
  botonSeleccionado: {
    backgroundColor: '#ff4655',
    borderColor: '#ff4655',
  },
  botonPresionado: {
    opacity: 0.8,
  },
  texto: {
    color: '#c8d0d8',
    fontSize: 15,
    fontWeight: '700',
  },
  textoSeleccionado: {
    color: '#ffffff',
  },
  error: {
    color: '#ff7580',
    fontSize: 13,
    marginTop: 6,
  },
});
