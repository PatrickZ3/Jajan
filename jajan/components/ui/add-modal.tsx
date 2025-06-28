import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  FlatList
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (expense: { name: string; amount: number; date: Date }) => void;
};

export default function AddModal({ visible, onClose, onSave }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSave = () => {
    if (!expenseName || !amount) return;
    onSave({ name: expenseName, amount: parseFloat(amount), date: selectedDate });
    setExpenseName("");
    setAmount("");
    onClose();
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Expense Name"
            value={expenseName}
            onChangeText={setExpenseName}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />

          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={onClose} color="#888" />
            <Button
              title="Save"
              onPress={handleSave}
              disabled={!expenseName || !amount}
              color="#4CAF50"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    width: "85%",
    alignItems: "stretch",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
});
