import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export default function DriverHeader({ driverName, busNumber }) {
  return (
    <LinearGradient
      colors={[colors.navy, colors.navy2]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.hero}
    >
      <Text style={styles.eyebrow}>Driver</Text>
      <Text style={styles.name}>{driverName}</Text>

      <View style={styles.chip}>
        <Text style={styles.chipLabel}>Bus number</Text>
        <Text style={styles.chipValue}>{busNumber}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 64,
  },
  eyebrow: {
    color: '#ffffffbf',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  name: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '800',
  },
  chip: {
    alignSelf: 'flex-start',
    marginTop: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    minWidth: 120,
  },
  chipLabel: {
    color: '#ffffffbf',
    fontSize: 12,
    fontWeight: '600',
  },
  chipValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 2,
  },
});