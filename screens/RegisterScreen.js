import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const QRLoginScreen = () => {
    const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.191.186:3000/api/client/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, mobile,username,password,firstname,lastname }),
      });

      const data = await response.json();
      const qrCodeUrl = data.token;
      console.log(data)
      Alert.alert('QR Code Generated', 'Scan the QR code displayed on the web page to log in.');
      navigation.navigate('ScanQR', { qrCodeUrl });
    } catch (error) {
        console.log(error)
      console.error('Failed to register:', error);
      Alert.alert('Registration Failed', 'Unable to register user.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Firstname"
        value={firstname}
        onChangeText={setFirstname}
      />
      <TextInput
        style={styles.input}
        placeholder="Lastname"
        value={lastname}
        onChangeText={setLastname}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        keyboardType="visible-password"
      />
      
      <Button title="Continue" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
  },
});

export default QRLoginScreen
