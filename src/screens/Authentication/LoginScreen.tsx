import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import * as Google from 'expo-auth-session/providers/google';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Replace with your own Google OAuth client ID
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     expoClientId: '<YOUR_EXPO_CLIENT_ID>',
//     iosClientId: '<YOUR_IOS_CLIENT_ID>',
//     androidClientId: '<YOUR_ANDROID_CLIENT_ID>',
//     webClientId: '<YOUR_WEB_CLIENT_ID>',
//   });

//   React.useEffect(() => {
//     if (response?.type === 'success') {
//       const { authentication } = response;
//       // Handle successful Google sign-in (e.g., send token to backend)
//       Alert.alert('Google Sign-In Success', JSON.stringify(authentication));
//     }
//   }, [response]);

  const handleLogin = () => {
    // Handle email/password login logic here
    Alert.alert('Login', `Email: ${email}\nPassword: ${password}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={{ marginVertical: 8 }} />
      <Button
        title="Sign in with Google"
        // onPress={() => promptAsync()}
        // disabled={!request}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
// ...existing code...