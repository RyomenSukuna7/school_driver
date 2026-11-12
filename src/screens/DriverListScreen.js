import { useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import DriverHeader from '../components/DriverHeader';
import StudentRow from '../components/StudentRow';
import { driver, initialStudents } from '../data/students';
import { colors } from '../theme';

export default function DriverListScreen() {
  const [students, setStudents] = useState(initialStudents);

  const toggleDropped = (id) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, dropped: !s.dropped } : s))
    );
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <DriverHeader driverName={driver.name} busNumber={driver.busNumber} />

      <View style={styles.panel}>
        <View style={styles.panelHead}>
          <Text style={styles.panelTitle}>Students on board</Text>
          <Text style={styles.panelCount}>{students.length} students</Text>
        </View>

        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <StudentRow student={item} onToggle={toggleDropped} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  panel: {
    flex: 1,
    marginTop: -36,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: colors.card,
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: colors.navy,
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  panelHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  panelTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '700',
  },
  panelCount: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '600',
  },
});