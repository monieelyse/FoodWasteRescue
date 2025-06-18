// src/screens/CreateAlertScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { createClient } from '@supabase/supabase-js';

// ─── Supabase Setup ─────────────────────────────────────────────────────────────
// Your Supabase project URL & anon key
const SUPABASE_URL   = 'https://wdeeuhwgkzabjcaimmln.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZWVl' +
  'aHdna3phYmpjYWltbWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMzUwNDMsImV4cCI6MjA2NDgx' +
  'MTA0NH0.LDqjLyBYgD8I0NybpAPvL7_kTsU1glio7D_Gr0z1yeg';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// ────────────────────────────────────────────────────────────────────────────────

export default function CreateAlertScreen({ navigation }) {
  const [description, setDescription] = useState('');
  const [weight, setWeight]           = useState('');
  const [startDate, setStartDate]     = useState(new Date());
  const [endDate, setEndDate]         = useState(new Date(Date.now() + 3600000));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker]     = useState(false);
  const [imageUri, setImageUri]       = useState(null);
  const [submitting, setSubmitting]   = useState(false);

  // 1️⃣ Take or pick a photo
  async function pickImage() {
    let { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera access is needed to take a photo.');
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  }

  // 2️⃣ Handle date/time pickers
  function onChangeStart(event, date) {
    setShowStartPicker(Platform.OS === 'ios');
    if (date) setStartDate(date);
  }
  function onChangeEnd(event, date) {
    setShowEndPicker(Platform.OS === 'ios');
    if (date) setEndDate(date);
  }

  // 3️⃣ Fetch current location
  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Location permission denied');
    }
    let { coords } = await Location.getCurrentPositionAsync({});
    return coords;
  }

  // 4️⃣ Upload image to Supabase Storage
  async function uploadImage(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ext = uri.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase
      .storage
      .from('alerts-images')
      .upload(fileName, blob);
    if (uploadError) throw uploadError;
    const { publicURL, error: urlError } = supabase
      .storage
      .from('alerts-images')
      .getPublicUrl(fileName);
    if (urlError) throw urlError;
    return publicURL;
  }

  // 5️⃣ Submit the new alert
  async function submitAlert() {
    if (!description || !weight || !imageUri) {
      Alert.alert('Missing fields', 'Please enter description, weight, and take a photo.');
      return;
    }
    setSubmitting(true);
    try {
      // Upload photo
      const imageUrl = await uploadImage(imageUri);
      // Get GPS
      const coords = await getLocation();
      // Insert row
      const { error: insertError } = await supabase
        .from('surplus_alerts')
        .insert([{
          business_id: 'db8e2d24-6485-4bb0-b148-ac0af6d34b4c',
          description,
          weight_estimate: parseInt(weight, 10),
          pickup_start: startDate.toISOString(),
          pickup_end: endDate.toISOString(),
          latitude: coords.latitude,
          longitude: coords.longitude,
          image_url: imageUrl,
        }]);
      if (insertError) throw insertError;

      Alert.alert('Success', 'Your alert has been posted!');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    } finally {
      setSubmitting(false);
    }
  }

  // Loading state
  if (submitting) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Form UI
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 5 loaves of bread"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Weight (lbs):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a number"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <Text style={styles.label}>Pickup Start:</Text>
      <Button title={startDate.toLocaleString()} onPress={() => setShowStartPicker(true)} />
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="datetime"
          display="default"
          onChange={onChangeStart}
        />
      )}

      <Text style={styles.label}>Pickup End:</Text>
      <Button title={endDate.toLocaleString()} onPress={() => setShowEndPicker(true)} />
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="datetime"
          display="default"
          onChange={onChangeEnd}
        />
      )}

      <View style={{ marginTop: 12 }}>
        <Button title="Take Photo" onPress={pickImage} />
        {imageUri && <Image source={{ uri: imageUri }} style={styles.preview} />}
      </View>

      <View style={{ marginTop: 20 }}>
        <Button title="Submit Alert" onPress={submitAlert} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center:    { flex: 1, justifyContent: 'center', alignItems: 'center' },
  label:     { marginTop: 12, fontWeight: 'bold' },
  input:     { borderBottomWidth: 1, paddingVertical: 4, marginBottom: 12 },
  preview:   { width: 100, height: 100, marginTop: 8 },
});
