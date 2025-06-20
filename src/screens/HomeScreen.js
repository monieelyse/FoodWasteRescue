import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../config/supabase';

const HomeScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error.message);
      } else {
        setUserEmail(user?.email || '');
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to FoodWasteRescue</Text>
      <Text style={styles.subtitle}>Logged in as: {userEmail}</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddListing')}>
  <Text style={styles.buttonText}>Add New Listing</Text>
</TouchableOpacity>

      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.link}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 30 },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { color: '#4CAF50', textAlign: 'center', marginTop: 10 },
});

export default HomeScreen;