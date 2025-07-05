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
                        numColumns={3}
                        columnWrapperStyle={{ justifyContent: 'space-around' }}
                        renderItem={({ item }) => {
                            console.log("Rendering item:", item);
                            return (
                                <TouchableOpacity style={styles.item} onPress={() => onSelect(item.name)}>
                                    <View style={styles.emojiContainer}>
                                        <Text style={styles.emoji}>{item.emoji}</Text>
                                    </View>
                                    <Text style={styles.name}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        }}
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
        flexGrow: 1,
    },
    title: {
        fontSize: 18,
        fontFamily: "TTNorms-Bold",
        marginBottom: 12,
        textAlign: "center",
    },
    list: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "flex-start",
    },
    item: {
        flexBasis: "30%",
        marginVertical: 10,
        marginHorizontal: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    emoji: {
        fontSize: 72,
        textAlign: "center",
    },

    name: {
        fontSize: 14,
        marginTop: 4,
        fontFamily: "TTNorms-Medium",
        textAlign: "center",
        flexWrap: "wrap",
        flexShrink: 1,
        maxWidth: 80,
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
    emojiContainer: {       // light gray background
        alignItems: "center",
        justifyContent: "center",
    },
});
