import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FoodWasteRescue</Text>
      <Text style={styles.subtitle}>Rescue food. Reduce waste. Feed others.</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.outlineButton]} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.outlineText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 40, textAlign: 'center' },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    width: '80%',
    borderRadius: 8,
    marginVertical: 10,
  },
  outlineButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  outlineText: { color: '#4CAF50', fontWeight: 'bold', textAlign: 'center' },
});

export default WelcomeScreen;