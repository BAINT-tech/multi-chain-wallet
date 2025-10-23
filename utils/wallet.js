import * as bip39 from "bip39";
import { hdkey } from "ethereumjs-wallet";
import * as ed25519 from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

export async function createMultiChainWallet() {
  const mnemonic = bip39.generateMnemonic();
  const seed = await bip39.mnemonicToSeed(mnemonic);

  // EVM
  const hdwallet = hdkey.fromMasterSeed(seed);
  const evmPath = "m/44'/60'/0'/0/0";
  const evmWallet = hdwallet.derivePath(evmPath).getWallet();
  const evmAddress = "0x" + evmWallet.getAddress().toString("hex");

  // Solana
  const solPath = "m/44'/501'/0'/0'";
  const solDerived = ed25519.derivePath(solPath, seed.toString("hex"));
  const solKeypair = Keypair.fromSeed(solDerived.key);
  const solAddress = solKeypair.publicKey.toBase58();

  return {
    mnemonic,
    evmAddress,
    solAddress,
  };
}

export async function importWalletFromMnemonic(mnemonic) {
  const seed = await bip39.mnemonicToSeed(mnemonic);

  // EVM
  const hdwallet = hdkey.fromMasterSeed(seed);
  const evmPath = "m/44'/60'/0'/0/0";
  const evmWallet = hdwallet.derivePath(evmPath).getWallet();
  const evmAddress = "0x" + evmWallet.getAddress().toString("hex");

  // Solana
  const solPath = "m/44'/501'/0'/0'";
  const solDerived = ed25519.derivePath(solPath, seed.toString("hex"));
  const solKeypair = Keypair.fromSeed(solDerived.key);
  const solAddress = solKeypair.publicKey.toBase58();

  return {
    mnemonic,
    evmAddress,
    solAddress,
  };
    }
