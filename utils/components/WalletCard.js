import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function WalletCard({ title, address }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text selectable style={styles.address}>
        {address}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    color: "#aaa",
    fontSize: 16,
    marginBottom: 4,
  },
  address: {
    color: "#fff",
    fontSize: 14,
  },
});
