import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function CampoFormulario({
  etiqueta,
  valor,
  onChangeText,
  keyboardType,
  error,
  ...otrasPropiedades
}) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>{etiqueta}</Text>
      <TextInput
        style={[styles.input, error && styles.inputConError]}
        value={valor}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor="#727e89"
        selectionColor="#ff4655"
        {...otrasPropiedades}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginBottom: 18,
  },
  etiqueta: {
    color: '#f5f5f5',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#182631',
    borderColor: '#53606d',
    borderRadius: 6,
    borderWidth: 1,
    color: '#ffffff',
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  inputConError: {
    borderColor: '#ff4655',
  },
  error: {
    color: '#ff7580',
    fontSize: 13,
    marginTop: 6,
  },
});
