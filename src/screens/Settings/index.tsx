// src/screens/Settings/index.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  SafeAreaView,
  ScrollView,
  Share,
} from 'react-native';

const SettingsScreen = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    soundEnabled: true,
    darkMode: false,
    autoBackup: true,
    taskReminders: true,
    weeklyReports: false,
    vibration: true,
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
    
    // Show feedback for important settings
    if (key === 'notifications') {
      Alert.alert(
        'Notifications',
        settings.notifications 
          ? 'Notifications disabled. You won\'t receive task updates.' 
          : 'Notifications enabled. You\'ll receive task updates.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleBackup = () => {
    Alert.alert(
      'Backup Data',
      'This will backup all your todos and settings to cloud storage.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Backup', 
          onPress: () => {
            // Simulate backup process
            Alert.alert('Success', 'Data backed up successfully!');
          }
        }
      ]
    );
  };

  const handleRestore = () => {
    Alert.alert(
      'Restore Data',
      'This will replace your current data with the backup. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Restore', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'Data restored successfully!');
          }
        }
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all your todos and reset the app. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Cleared', 'All data has been cleared.');
          }
        }
      ]
    );
  };

  const handleShareApp = async () => {
    try {
      await Share.share({
        message: 'Check out this amazing Todo app! It helps me stay organized and productive.',
        title: 'Todo App',
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const handleContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'Need help? Contact us at support@todoapp.com or through our help center.',
      [
        { text: 'OK' },
        { 
          text: 'Open Help Center',
          onPress: () => Alert.alert('Info', 'Help center would open here')
        }
      ]
    );
  };

  const SettingItem = ({ 
    title, 
    subtitle, 
    value, 
    onToggle, 
    showSwitch = true,
    onPress,
    rightText,
    iconColor = '#007AFF'
  }: {
    title: string;
    subtitle?: string;
    value?: boolean;
    onToggle?: () => void;
    showSwitch?: boolean;
    onPress?: () => void;
    rightText?: string;
    iconColor?: string;
  }) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress || onToggle}
      disabled={!onPress && !onToggle}
    >
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {showSwitch && value !== undefined ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#767577', true: iconColor }}
          thumbColor={value ? '#fff' : '#f4f3f4'}
        />
      ) : rightText ? (
        <Text style={[styles.rightText, { color: iconColor }]}>{rightText}</Text>
      ) : (
        <Text style={styles.chevron}>›</Text>
      )}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Notification Settings */}
        <SectionHeader title="NOTIFICATIONS" />
        <View style={styles.section}>
          <SettingItem
            title="Push Notifications"
            subtitle="Receive notifications for new tasks and reminders"
            value={settings.notifications}
            onToggle={() => toggleSetting('notifications')}
          />
          <SettingItem
            title="Sound"
            subtitle="Play sound for notifications"
            value={settings.soundEnabled}
            onToggle={() => toggleSetting('soundEnabled')}
          />
          <SettingItem
            title="Vibration"
            subtitle="Vibrate for notifications"
            value={settings.vibration}
            onToggle={() => toggleSetting('vibration')}
          />
          <SettingItem
            title="Task Reminders"
            subtitle="Get reminded about pending tasks"
            value={settings.taskReminders}
            onToggle={() => toggleSetting('taskReminders')}
          />
          <SettingItem
            title="Weekly Reports"
            subtitle="Receive weekly productivity reports"
            value={settings.weeklyReports}
            onToggle={() => toggleSetting('weeklyReports')}
          />
        </View>

        {/* Appearance */}
        <SectionHeader title="APPEARANCE" />
        <View style={styles.section}>
          <SettingItem
            title="Dark Mode"
            subtitle="Use dark theme"
            value={settings.darkMode}
            onToggle={() => toggleSetting('darkMode')}
          />
          <SettingItem
            title="App Icon"
            subtitle="Change app icon"
            showSwitch={false}
            onPress={() => Alert.alert('Coming Soon', 'Custom app icons will be available in a future update')}
          />
        </View>

        {/* Data & Storage */}
        <SectionHeader title="DATA & STORAGE" />
        <View style={styles.section}>
          <SettingItem
            title="Auto Backup"
            subtitle="Automatically backup your data"
            value={settings.autoBackup}
            onToggle={() => toggleSetting('autoBackup')}
          />
          <SettingItem
            title="Backup Now"
            subtitle="Manually backup your todos"
            showSwitch={false}
            onPress={handleBackup}
            rightText="Backup"
          />
          <SettingItem
            title="Restore Data"
            subtitle="Restore from previous backup"
            showSwitch={false}
            onPress={handleRestore}
            rightText="Restore"
          />
          <SettingItem
            title="Clear All Data"
            subtitle="Delete all todos and reset app"
            showSwitch={false}
            onPress={handleClearData}
            rightText="Clear"
            iconColor="#ff4444"
          />
        </View>

        {/* About & Support */}
        <SectionHeader title="ABOUT & SUPPORT" />
        <View style={styles.section}>
          <SettingItem
            title="Share App"
            subtitle="Tell your friends about this app"
            showSwitch={false}
            onPress={handleShareApp}
          />
          <SettingItem
            title="Rate App"
            subtitle="Rate us on the App Store"
            showSwitch={false}
            onPress={() => Alert.alert('Thank You!', 'This would open the App Store rating page')}
          />
          <SettingItem
            title="Contact Support"
            subtitle="Get help or report issues"
            showSwitch={false}
            onPress={handleContactSupport}
          />
          <SettingItem
            title="Privacy Policy"
            subtitle="Read our privacy policy"
            showSwitch={false}
            onPress={() => Alert.alert('Privacy Policy', 'Privacy policy would be displayed here')}
          />
          <SettingItem
            title="Terms of Service"
            subtitle="Read our terms of service"
            showSwitch={false}
            onPress={() => Alert.alert('Terms of Service', 'Terms of service would be displayed here')}
          />
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>Todo App</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.copyright}>© 2024 Todo App. All rights reserved.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6d6d79',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
    letterSpacing: 0.5,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5ea',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 17,
    color: '#000',
    fontWeight: '400',
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#8e8e93',
    marginTop: 2,
  },
  rightText: {
    fontSize: 17,
    fontWeight: '400',
    marginRight: 10,
  },
  chevron: {
    fontSize: 20,
    color: '#c7c7cc',
    fontWeight: '400',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 16,
    color: '#8e8e93',
    marginBottom: 10,
  },
  copyright: {
    fontSize: 13,
    color: '#8e8e93',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default SettingsScreen;