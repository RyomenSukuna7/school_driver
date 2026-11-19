import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

export default function StudentRow({ student, onToggle, onPickUp }) {
  const { id, name, grade, stop, dropped } = student;
  const [pickedUp, setPickedUp] = useState(Boolean(student.pickedUp || dropped));
  const label = dropped ? 'Dropped ✓' : pickedUp ? 'Dropped' : 'Picked up';

  // Which action is waiting for the driver to confirm: 'pickup', 'drop', 'undo' or null.
  const [pending, setPending] = useState(null);

  const handlePress = () => {
    setPending(!pickedUp ? 'pickup' : dropped ? 'undo' : 'drop');
  };

  const confirm = () => {
    if (pending === 'pickup') {
      setPickedUp(true);
      onPickUp?.(id);
    } else {
      onToggle(id); // marks the child dropped, or undoes a drop
    }
    setPending(null);
  };

  const dialog = {
    pickup: { title: 'Confirm pickup', message: `Mark ${name} as picked up? Their parents will be told.` },
    drop: { title: 'Confirm drop', message: `Mark ${name} as dropped? Their parents will be told.` },
    undo: { title: 'Undo drop?', message: `Mark ${name} as not dropped yet?` },
  }[pending];
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
        onPress={handlePress}
        style={({ pressed }) => [
          styles.btn,
          dropped && styles.btnDropped,
          pressed && { opacity: 0.8 },
        ]}
      >
        <Text style={[styles.btnText, dropped && styles.btnTextDropped]}>
          {label}
        </Text>
      </Pressable>

      <Modal
        visible={pending !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setPending(null)}
      >
        <View style={styles.backdrop}>
          <View style={styles.dialog}>
            <Text style={styles.dialogTitle}>{dialog?.title}</Text>
            <Text style={styles.dialogMessage}>{dialog?.message}</Text>
            <View style={styles.dialogButtons}>
              <Pressable
                onPress={() => setPending(null)}
                style={({ pressed }) => [styles.dialogBtn, styles.cancelBtn, pressed && { opacity: 0.8 }]}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={confirm}
                style={({ pressed }) => [styles.dialogBtn, styles.confirmBtn, pressed && { opacity: 0.8 }]}
              >
                <Text style={styles.confirmText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  dialog: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 22,
  },
  dialogTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '700',
  },
  dialogMessage: {
    color: colors.muted,
    fontSize: 15,
    marginTop: 8,
    lineHeight: 21,
  },
  dialogButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 22,
  },
  dialogBtn: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    borderWidth: 1.5,
    borderColor: colors.line,
  },
  cancelText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '700',
  },
  confirmBtn: {
    backgroundColor: colors.navy,
  },
  confirmText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});