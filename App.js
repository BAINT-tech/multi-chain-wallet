import React, { useState } from "react";
import { View, Text, Button, ScrollView, TextInput, StyleSheet } from "react-native";
import WalletCard from "./components/WalletCard";
import { createMultiChainWallet, importWalletFromMnemonic } from "./utils/wallet";

export default function App() {
  const [wallet, setWallet] = useState(null);
  const [mnemonicInput, setMnemonicInput] = useState("");

  const handleCreate = async () => {
    const w = await createMultiChainWallet();
    setWallet(w);
  };

  const handleImport = async () => {
    const w = await importWalletFromMnemonic(mnemonicInput.trim());
    setWallet(w);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🪙 Multi-Chain Wallet</Text>

      <Button title="Create New Wallet" onPress={handleCreate} />
      <Text style={styles.or}>— or —</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter mnemonic to import"
        placeholderTextColor="#888"
        value={mnemonicInput}
        onChangeText={setMnemonicInput}
      />
      <Button title="Import Wallet" onPress={handleImport} />

      {wallet && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.mnemonicLabel}>Mnemonic:</Text>
          <Text selectable style={styles.mnemonic}>{wallet.mnemonic}</Text>

          <WalletCard title="EVM Address" address={wallet.evmAddress} />
          <WalletCard title="Solana Address" address={wallet.solAddress} />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },
  header: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  or: {
    textAlign: "center",
    color: "#888",
    marginVertical: 10,
  },
  input: {
    borderColor: "#555",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: "#fff",
    marginBottom: 10,
  },
  mnemonicLabel: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 10,
  },
  mnemonic: {
    color: "#0f0",
    fontSize: 12,
    marginBottom: 10,
  },
});
