import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { TouchableOpacity, Platform, StyleSheet, Text, View, StatusBar, Button, ScrollView, TextInput } from 'react-native';
import Flyy from 'react-native-flyy';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SDK Setup"
          component={SDKSetupScreen}
          options={{ title: "SDK Setup" }}
        />
        <Stack.Screen
          name="Sign Up"
          component={SignUpScreen}
          options={{ title: "Sign Up" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;

const SDKSetupScreen = ({ navigation }) => {
  const [packageName, onChangePackageName] = React.useState(null);
  const [partnerId, onChangePartnerId] = React.useState(null);

  const onNextPressed = {
    initialize() {
      if (packageName != null && partnerId != null) {
        Flyy.setPackageName(packageName);
        Flyy.initSDK(partnerId, Flyy.STAGE);
      }
      navigation.navigate('Sign Up');
    },
  }

  return (
    <View
      style={styles.main}>
      <ScrollView
        style={{ width: '100%', }}
        contentContainerStyle={{ alignItems: 'center', padding: 16 }}>
        <TextInput
          style={styles.input}
          placeholder="Package name"
          onChangeText={onChangePackageName}
          value={packageName}
          keyboardType="default"
        />
        <Text
          style={styles.caption}>from Settings > Connect SDK</Text>
        <TextInput
          style={styles.input}
          placeholder="Partner ID"
          onChangeText={onChangePartnerId}
          value={partnerId}
          keyboardType="default"
        />
        <Text
          style={styles.caption}>from Settings > SDK Keys</Text>
        <View
          style={{ height: 10 }} />
         <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onNextPressed.initialize();
          }}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const SignUpScreen = ({ navigation }) => {
  const [referralCode, onReferralCodeChange] = React.useState(null);
  const [userId, onUserIdChanged] = React.useState(null);
  const [userName, onUserNameChanged] = React.useState(null);
  return (
    <View
      style={styles.main}>
      <ScrollView
        style={{ width: '100%', }}
        contentContainerStyle={{ alignItems: 'center', padding: 16 }}>
        <TextInput
          style={styles.input}
          placeholder="Enter Referral Code"
          onChangeText={onReferralCodeChange}
          keyboardType="default"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (referralCode != null) {
              Flyy.verifyReferralCode(referralCode,
                (isValid, referralCode) => {
                  if (isValid) {
                    Flyy.setReferralCode(referralCode);
                  }
                });
            }
          }}>
          <Text style={styles.buttonText}>Set Referral Code</Text>
        </TouchableOpacity>
        <View
          style={{ height: 24 }} />
        <TextInput
          style={styles.input}
          placeholder="User ID"
          onChangeText={onUserIdChanged}
          keyboardType="default"
        />
        <TextInput
          style={styles.input}
          placeholder="User Name (Optional)"
          onChangeText={onUserNameChanged}
          keyboardType="default"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (userId != null) {
              Flyy.setNewUser(userId);
              navigation.navigate('Home');
            }
            if (userName != null) {
              Flyy.setUserName(userName);
            }
          }}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}


const HomeScreen = ({ navigation }) => {
  const [event, onEventChanged] = React.useState("kyc_done");

  return (
    <View
      style={styles.main}>
      <ScrollView
        style={{ width: '100%', }}
        contentContainerStyle={{ alignItems: 'center', padding: 16 }}>
        <TextInput
          style={styles.input}
          placeholder="Enter Event"
          value={event}
          onChangeText={onEventChanged}
          keyboardType="default"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (event != null) {
              Flyy.sendEvent(event, "true");
            }
          }}>
          <Text style={styles.buttonText}>Update KYC</Text>
        </TouchableOpacity>
        <View
          style={{height:24}}/>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Flyy.openOffersScreen();
          }}>
          <Text style={styles.buttonText}>Invite and Earn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Flyy.openReferralHistory();
          }}>
          <Text style={styles.buttonText}>Referral History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Flyy.getReferralCount(
              (referralCount) => {
                console.log("Referral Count " + referralCount);
              });
          }}>
          <Text style={styles.buttonText}>Referral Count</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    height: '100%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    height: 40,
    width: '100%',
    borderRadius: 8,
    borderColor: 'deepskyblue',
    borderWidth: 1,
    padding: 10,
    margin: 25,
    marginBottom: 8,
  },
  caption: {
    color: "#5C5C5C",
    textAlign: 'center',
    fontSize: 12,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: 'deepskyblue',
    textAlign: 'center',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
}

);