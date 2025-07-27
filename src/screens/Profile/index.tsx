// src/screens/Profile/index.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  totalTodos: number;
  completedTodos: number;
  joinDate: string;
}

const ProfileScreen = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '👤',
    totalTodos: 25,
    completedTodos: 18,
    joinDate: 'January 2024',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(profile.name);
  const [editedEmail, setEditedEmail] = useState(profile.email);

  const completionRate = profile.totalTodos > 0 
    ? Math.round((profile.completedTodos / profile.totalTodos) * 100) 
    : 0;

  const handleSaveProfile = () => {
    if (editedName.trim() === '' || editedEmail.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setProfile({
      ...profile,
      name: editedName,
      email: editedEmail,
    });
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setEditedName(profile.name);
    setEditedEmail(profile.email);
    setIsEditing(false);
  };

  const StatCard = ({ title, value, subtitle }: { title: string; value: string | number; subtitle?: string }) => (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  const ProfileItem = ({ label, value, editable = false, onChangeText, keyboardType = 'default' }: any) => (
    <View style={styles.profileItem}>
      <Text style={styles.profileLabel}>{label}</Text>
      {isEditing && editable ? (
        <TextInput
          style={styles.profileInput}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      ) : (
        <Text style={styles.profileValue}>{value}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{profile.avatar}</Text>
          </View>
          <Text style={styles.userName}>{profile.name}</Text>
          <Text style={styles.userEmail}>{profile.email}</Text>
          <Text style={styles.joinDate}>Member since {profile.joinDate}</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsRow}>
            <StatCard title="Total Tasks" value={profile.totalTodos} />
            <StatCard title="Completed" value={profile.completedTodos} />
            <StatCard 
              title="Success Rate" 
              value={`${completionRate}%`}
              subtitle={completionRate >= 70 ? 'Great job! 🎉' : 'Keep going! 💪'}
            />
          </View>
        </View>

        {/* Achievement Section */}
        <View style={styles.achievementContainer}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementGrid}>
            <View style={[styles.achievementCard, profile.totalTodos >= 10 && styles.achievementUnlocked]}>
              <Text style={styles.achievementIcon}>🏆</Text>
              <Text style={styles.achievementTitle}>Task Master</Text>
              <Text style={styles.achievementDesc}>Create 10 tasks</Text>
            </View>
            <View style={[styles.achievementCard, profile.completedTodos >= 5 && styles.achievementUnlocked]}>
              <Text style={styles.achievementIcon}>⚡</Text>
              <Text style={styles.achievementTitle}>Productive</Text>
              <Text style={styles.achievementDesc}>Complete 5 tasks</Text>
            </View>
            <View style={[styles.achievementCard, completionRate >= 80 && styles.achievementUnlocked]}>
              <Text style={styles.achievementIcon}>🎯</Text>
              <Text style={styles.achievementTitle}>Perfectionist</Text>
              <Text style={styles.achievementDesc}>80% completion rate</Text>
            </View>
            <View style={[styles.achievementCard, profile.totalTodos >= 50 && styles.achievementUnlocked]}>
              <Text style={styles.achievementIcon}>🚀</Text>
              <Text style={styles.achievementTitle}>Super User</Text>
              <Text style={styles.achievementDesc}>Create 50 tasks</Text>
            </View>
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.profileContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Profile Information</Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
            >
              <Text style={styles.editButtonText}>
                {isEditing ? 'Save' : 'Edit'}
              </Text>
            </TouchableOpacity>
          </View>

          <ProfileItem
            label="Full Name"
            value={editedName}
            editable={true}
            onChangeText={setEditedName}
          />
          <ProfileItem
            label="Email"
            value={editedEmail}
            editable={true}
            onChangeText={setEditedEmail}
            keyboardType="email-address"
          />
          <ProfileItem
            label="Member Since"
            value={profile.joinDate}
          />

          {isEditing && (
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>📊 View Detailed Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>📤 Export Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.dangerButton]}>
            <Text style={[styles.actionButtonText, styles.dangerButtonText]}>🗑️ Clear All Data</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    fontSize: 40,
    color: '#fff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  joinDate: {
    fontSize: 14,
    color: '#999',
  },
  statsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  statTitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  statSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  achievementContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
    opacity: 0.5,
  },
  achievementUnlocked: {
    backgroundColor: '#e8f5e8',
    opacity: 1,
  },
  achievementIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  achievementDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  profileContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  profileItem: {
    marginBottom: 20,
  },
  profileLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  profileValue: {
    fontSize: 16,
    color: '#666',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  profileInput: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#ff4444',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionContainer: {
    marginHorizontal: 15,
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  dangerButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  dangerButtonText: {
    color: '#ff4444',
  },
});

export default ProfileScreen;