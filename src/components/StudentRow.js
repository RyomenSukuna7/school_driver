import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export default function StudentRow({ student, onToggle }) {
  const { id, name, grade, stop, dropped } = student;
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

  return (
    <View style={styles.row}>
      <View style={[styles.avatar, dropped && styles.avatarDropped]}>
        <Text style={[styles.avatarText, dropped && styles.avatarTextDropped]}>
          {initials}
        </Text>
      </View>

      <View style={styles.info}>
        <Text
          style={[styles.name, dropped && styles.nameDropped]}
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {grade} · {stop}
        </Text>
      </View>

      <Pressable
        onPress={() => onToggle(id)}
        style={({ pressed }) => [
          styles.btn,
          dropped && styles.btnDropped,
          pressed && { opacity: 0.8 },
        ]}
      >
        <Text style={[styles.btnText, dropped && styles.btnTextDropped]}>
          {dropped ? 'Dropped ✓' : 'Dropped'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.avatarBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarDropped: {
    backgroundColor: colors.tealSoft,
  },
  avatarText: {
    color: colors.navy2,
    fontWeight: '700',
    fontSize: 15,
  },
  avatarTextDropped: {
    color: colors.teal,
  },
  info: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '700',
  },
  nameDropped: {
    color: colors.muted,
  },
  meta: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 2,
  },
  btn: {
    minWidth: 110,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDropped: {
    backgroundColor: colors.tealSoft,
    borderWidth: 1.5,
    borderColor: colors.teal,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  btnTextDropped: {
    color: colors.teal,
  },
});