import React from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from "react-native";

type Category = {
    emoji: string;
    name: string;
};

type Props = {
    visible: boolean;
    categories: Category[];
    onSelect: (categoryName: string) => void;
    onClose: () => void;
};

export default function CategoryModal({
    visible,
    categories,
    onSelect,
    onClose,
}: Props) {
    console.log("CategoryModal categories prop:", categories);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Choose Category</Text>
                    <FlatList
                        style={{ flex: 1 }}
                        data={categories}
                        keyExtractor={(item) => item.name}
                        numColumns={4}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => onSelect(item.name)}
                            >
                                <Text style={styles.emoji}>{item.emoji}</Text>
                                <Text style={styles.name}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.list}
                    />

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Cancel</Text>
                    </TouchableOpacity>
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
        padding: 16,
        width: "85%",
        maxHeight: "80%",
        alignItems: "stretch",
    },
    title: {
        fontSize: 18,
        fontFamily: "TTNorms-Bold",
        marginBottom: 12,
        textAlign: "center",
    },
    list: {
        alignItems: "center",
    },
    item: {
        flex: 1,
        margin: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    emoji: {
        fontSize: 32,
    },
    name: {
        fontSize: 12,
        marginTop: 4,
        fontFamily: "TTNorms-Medium",
        textAlign: "center",
    },
    closeButton: {
        marginTop: 16,
        backgroundColor: "#ff4d42",
        padding: 10,
        borderRadius: 8,
    },
    closeButtonText: {
        color: "#fff",
        textAlign: "center",
        fontFamily: "TTNorms-Bold",
    },
});
