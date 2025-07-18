import React, { useState, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import CategoryModal from "./add-category";
import { TouchableWithoutFeedback } from "react-native";


type Category = {
    emoji: string;
    name: string;
};

type Props = {
    visible: boolean;
    onClose: () => void;
    onSave: (expense: { name: string; amount: number; date: Date; category: string }) => void;
    categories: Category[];
    selectedDate: Date;
};

export default function AddModal({ visible, onClose, onSave, categories, selectedDate: selectedDateProp }: Props) {
    const [selectedDate, setSelectedDate] = useState<Date>(selectedDateProp);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]?.name ?? "")
    const [expenseName, setExpenseName] = useState("");
    const [amount, setAmount] = useState("");
    const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);

    const handleSave = () => {
        if (!expenseName || !amount) return;
        onSave({
            name: expenseName,
            amount: parseFloat(amount),
            date: selectedDate,
            category: selectedCategory,
        });
        setExpenseName("");
        setAmount("");
        onClose();
    };

    const handleSelectCategory = (categoryName: string) => {
        setSelectedCategory(categoryName);
        setIsCategoryModalVisible(false);
    };

    useEffect(() => {
        if (visible && categories.length > 0) {
            setSelectedCategory(categories[0].name);
        }
    }, [visible, categories]);

    useEffect(() => {
        setSelectedDate(selectedDateProp);
    }, [selectedDateProp]);


    return (
        <>
            {isCategoryModalVisible ? (
                <CategoryModal
                    visible={true}
                    categories={categories}
                    onSelect={(categoryName) => {
                        setSelectedCategory(categoryName);
                        setIsCategoryModalVisible(false);
                    }}
                    onClose={() => setIsCategoryModalVisible(false)}
                />
            ) : (
                <Modal
                    visible={visible}
                    transparent
                    animationType="fade"
                    onRequestClose={onClose}
                >
                    <TouchableWithoutFeedback onPress={onClose}>
                        <View style={styles.overlay}>
                            <View style={styles.modalContent}>
                                <View style={styles.inputRow}>
                                    <TouchableOpacity onPress={() => setIsCategoryModalVisible(true)}>
                                        <Text style={styles.emoji}>
                                            {categories.find(c => c.name === selectedCategory)?.emoji ?? "❓"}
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={styles.inputColumn}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Expense Name"
                                            placeholderTextColor="#6B7280"
                                            value={expenseName}
                                            onChangeText={setExpenseName}
                                        />
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Amount"
                                            placeholderTextColor="#6B7280"
                                            value={amount}
                                            onChangeText={setAmount}
                                            keyboardType="numeric"
                                        />
                                    </View>
                                </View>

                                <View style={styles.buttonRow}>
                                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                                        <Text style={{ color: "#fff", textAlign: "center", fontFamily: "TTNorms-Bold", }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[
                                            styles.saveButton,
                                            (!expenseName || !amount) && { opacity: 0.5 }
                                        ]}
                                        onPress={handleSave}
                                        disabled={!expenseName || !amount}
                                    >
                                        <Text style={{ color: "#fff", textAlign: "center", fontFamily: "TTNorms-Bold", }}>＋ Add</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}
        </>
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
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    emoji: {
        fontSize: 48,
        padding: 6,
        alignSelf: "center",
    },
    inputColumn: {
        flex: 1,
        justifyContent: "space-between",
    },
    input: {
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginTop: 12,
        fontFamily: "TTNorms-Medium",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 6,

    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        marginBottom: 8,
    },
    cancelButton: {
        backgroundColor: "#ff4d42",
        padding: 10,
        borderRadius: 8,
    },
    saveButton: {
        backgroundColor: "#8FE381",
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 8,
    },
});
