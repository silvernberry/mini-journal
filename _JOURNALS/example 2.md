---
title: Jekyll journal
description: this is a sample description
date: 12.10.2023
youtube: slughere
toc: true
giscus: true
contributors: Name1, Name 2
reviewers: username1, username2
---

*Berlin version 2bcdb2d – 2023-08-25*

_Mellowpaper represents readable soft-version of the Ethereum Yellowpaper_

**Original Author**: Dr. Gavin Wood (Founder, Ethereum & Parity) gavin@parity.io

**Version Author**: Joby Reuben 

# Abstract

This document, originally authored by Dr. Gavin Wood, introduces Ethereum as a secure and decentralized transaction ledger. It compares Ethereum to the blockchain paradigm, highlighting its ability to implement this concept in a more generalized manner. Ethereum goes beyond the traditional singleton model, offering multiple computing resources, each with its own state and code. These resources can interact through a message-passing system. The document discusses Ethereum's design, implementation challenges, opportunities, and future challenges.

# Introduction

In a world with widespread internet access, Bitcoin has shown that it's possible to create a decentralized value transfer system that's nearly free to use, thanks to the internet's power, consensus mechanisms, and adherence to social contracts. This system is like a specialized, secure, transaction-based state machine. Ethereum goes beyond this by aiming to create a generalized technology that can be used for various state machine applications. It also seeks to offer developers an integrated system to build software on a new computing paradigm: a trustworthy object messaging compute framework.

## Driving Factors

The primary goal of the ethereum project is to enable secure transactions between people who might not trust each other due to various reasons like distance, technical barriers, or problems with existing legal systems. This is achieved by creating a system with clear rules and a structure that ensures agreements are automatically enforced. In this system, key attributes include incorruptible judgment, which comes from impartial algorithms, and transparency, achieved through transaction logs and clear rules. Ultimately, the aim is to provide users with confidence in their interactions, regardless of who or what they are interacting with.

## Previous Work

| Author(s)           | Key Contribution                                                           |
|---------------------|---------------------------------------------------------------------------|
| [Buterin](https://github.com/ethereum/wiki/wiki/White-Paper)             | Proposed the concept of a blockchain with a Turing-complete language.     |
| [Dwork and Naor](https://web.archive.org/web/20170810035254/http://www.wisdom.weizmann.ac.il/~naor/PAPERS/pvp.pdf)      | Introduced the idea of using "proof-of-work" for value transmission.       |
| [Adam Back](https://web.archive.org/web/20170810043047/http://www.hashcash.org/papers/amortizable.pdf)           | Developed a similar system using "proof-of-work."                        |
| [Vivek Vishnumurthy](https://web.archive.org/web/20170810031834/https://www.cs.cornell.edu/people/egs/papers/karma.pdf)  | Used "proof-of-work" for peer-to-peer file trading with security measures. |
| [Nakamoto](https://www.mail-archive.com/cryptography@metzdowd.com/msg09959.html)            | Created Bitcoin, the first widely adopted decentralized ledger.           |
| [Sprankel](https://web.archive.org/web/20170810025028/http://www.coderblog.de/wp-content/uploads/technical-basis-of-digital-currencies.pdf)            | Discussed Litecoin and Primecoin as Bitcoin alternatives.                |
| [Aron](http://www.sciencedirect.com/science/article/pii/S0262407912601055)                | Explored Namecoin, a decentralized name-resolution system.               |
| [Willet](https://web.archive.org/web/20170810035927/https://github.com/OmniLayer/spec)              | Proposed Mastercoin, a protocol with additional features on top of Bitcoin. |
| [Rosenfeld](https://web.archive.org/web/20180220235952/https://github.com/Colored-Coins/Colored-Coins-Protocol-Specification)           | Suggested Coloured Coins, allowing token creation and tracking in Bitcoin. |
| [Boutellier](https://web.archive.org/web/20170810040208/https://www.springer.com/gb/book/9783319040158)          | Discussed Ripple's "federated" system for currency exchange.              |
| [Szabo](https://web.archive.org/web/20170810042659/http://firstmonday.org/ojs/index.php/fm/article/view/548) and [Miller](https://drive.google.com/file/d/0Bw0VXJKBgYPMS0J2VGIyWWlocms/edit?usp=sharing).    | Early work on smart contracts, predicting their impact on cooperation.    |

These contributions have paved the way for Ethereum, which aims to implement a generalized "crypto-law" system for secure agreements.

# The Blockchain Paradigm

Ethereum operates like a transaction-based state machine. It starts with a genesis state and updates it through transactions to create some current state, which is considered the canonical version of world of Ethereum. This state can contain any arbitrary information, like account balances, trust arrangements, and anything admissable to a computer.

Transactions (TX) represent valid changes from one state to another. Not all changes are valid; for example, reducing an account balance without increasing another is invalid. 

Valid state changes happen produces a `#NEW-STATE` by applying the `#STATE-TRANSITION` function to `#INITIAL-STATE` and the transaction `TX`. This `#STATE-TRANSITION` function can be applied individually to an account which alters the world state itself `#STATE`:

```
#NEW-STATE = !STATE-TRANSITION(#INITIAL-STATE, TX)
```

In Ethereum, the State Transition Function `#ST` and State are considerably more powerful than any existing comparable system. `#ST` allows components to perform any computation, while State stores information between transactions `TX`.

```
BLOCK = (...,(TX_0,TX_1,...),...)
```

Transactions are grouped into a block `BLOCK`, connected using cryptographic hashes. Blocks serve as a ledger, recording transactions, the previous block's identifier, and the identifier of the final state (not the entire state itself). They also provide incentives for mining, where nodes compete to validate a block using a secure proof called proof-of-work.

> **Note** : Ethereum State is stored off-chain and the blockchain only records state transitions via transactions. To successfully validate, the given short identifier of the final state should match by applying state transition function on transactions

The Block Level State Transition Function `!BLOCK-ST` indicates that a Block's State is derived from the Block Finalization State Transition Function `!BLOCK-FINAL-ST`. Transactions sequentially undergo State Transition, resulting in the final Transaction, which constitutes a Block's State.

```
#NEW-STATE = !BLOCK-ST(#INITIAL-STATE, BLOCK)
```
```
!BLOCK-ST(#STATE, BLOCK) = !BLOCK-FINAL-ST(BLOCK, #ST..(#ST(#ST, TX_0),TX_1) ...)
```

Incentivization occurs as a State Transition `#ST` of the final Transaction, adding value to a nominated account through the Block Finalization State Transition `!B-FINAL-ST`.

This concept forms the foundation of the blockchain paradigm used in Ethereum and other decentralized consensus-based transactional systems.

## Value

Ether, known as ETH, the smallest subdenomination integer value "Wei" is the transmitting value in agreement within the network to incentivize computation. One Ether is defined as being 10^18 Wei. There exist other subdenomination of Ether:

|Multiplier|Name|
|-----|---|
|10^0 | Wei |
|10^12|  Szabo |
|10^15|  Finney |
|10^18|  Ether |

Throughout the present work, any reference to value, in the context of Ether, currency, a balance or a payment, should be assumed to be counted in Wei.

## Which History?

In a decentralized system like Ethereum, where all parties can create new blocks on existing ones, the structure naturally forms a tree of blocks. To reach a consensus on the "best" path from the root (genesis block) to the leaf (block with the latest transactions), a standardized agreed-scheme is crucial. If nodes ever disagree on the best path, a fork occurs.

This means that beyond a certain point in time (block), multiple states of the system may co-exist: some nodes consider one block as canonical, while others favor a different block with potentially incompatible transactions. This situation is highly undesirable as it can erode confidence in the system.

To prevent this, we use a simplified version of the GHOST protocol by [Sompolinsky and Zoha](https://eprint.iacr.org/2013/881). Details are explained in the section titled [Blocktree to Blockchain](#blocktree-to-blockchain)

Sometimes, a path follows a new protocol from a particular height (block number).
This document describes one version of the protocol, namely the _Berlin_ version defined by [Beiko](https://github.com/ethereum/eth1.0-specs/blob/master/network-upgrades/mainnet-upgrades/berlin.md).

In order to follow back the history of a path, one must reference multiple versions of this document.

|Name | First Block Number |
|---|---|
|Homestead        |  1150000 |
|Tangerine Whistle|  2463000 |
|Spurious Dragon  |  2675000 |
|Byzantium        |  4370000 |
|Constantinople   |  7280000 |
|Petersburg       |  7280000 |
|Istanbul         |  9069000 |
|Muir Glacier     |  9200000 |
|Berlin           | 12244000 |
|London           | 12965000 |
|Arrow Glacier    | 13773000 |
|Gray Glacier     | 15050000 |

Occasionally actors do not agree on a protocol change, and a permanent fork occurs. In order to distinguish between diverged blockchains, [EIP-155](https://eips.ethereum.org/EIPS/eip-155) by Vitalik Buterin introduced the concept of chain ID.

For the Ethereum main network,
```
chainid = 1
```

# Conventions & Symbols

|Item| Convention|Examples|
|--|--|--|
|Top-level structures |Uppercase initials/Word prefixed by Hash #| `#STATE`, the world state. <br> `#MACHINE-STATE`, the machine state|
|Functions on highly structured values| Uppercase initial/word prefixed by exclamation ! | `!ST` or `!STATE-TRANSITION`, ethereum state transition function |
|Most functions|Uppercase initials/word prefixed by exclamation !, possibly underscore to reference individual components | `!COST`, general cost function <br> `!COST_SSSTORE`, the cost function for SSSTORE operation|
|Specialized Functions| Prefix exclamation AND SPL-FUNC and an underscore to denote the function with Uppercase initials/word| `!SPL-FUNC_KEC`, Keccak-256 hash <br> `!SPL-FUNC_KEC512`, Keccak-512 hash | 
|Tuple|Uppercase initial/word|`TX`, a transaction|
|Component of a Tuple|Uppercase initials/word of Tuple with underscore/subscripted lower case initial/word|`TX_nonce`, transaction nonce <br> `BLOCK_HEADER`, block and header both are tuples|
|Scalar, fixed ize byte sequences/arrays|Lowercase initials/word|`nonce`, transaction nonce <br> `numofstack`, number of stack items required|
|Arbitrary length sequences|Lowercase initials/word prefixed and suffixed by two dots|`..output..`, output data of a message call|
|Sets| Uppercase initials/word and maximum length in bytes inside open close braces| `POSITIVE-INT{256}`, positive integers less than 256, <br> `BYTE{32}`, byte sequences of 32 byte|
|Component or subsequences of sequences|Square brackets|`#MACHINE-STATE..stack..[0]`, first item on the stack <br> `#MACHINE-STATE..memory..[0..31]`, first 32 items in the memory |
| Modified (and utilizable) value|Prime mark| `gas'`, gas remaining|
|Intermediate Values|*||
|Combined representation| combined by hyphen -||
|Element-wise transformation|||
|ELEMENT OF reference| Tags of less than, greater than `<element>`||
|Length of a sequence or a vector/matrix| `||...||` | |
|Last Item of a sequence| Can be a Function | `!LAST`


# Blocks, State and Transactions

Since basic concepts of Ethereum are introduced, now lets dive in to transactions, blocks and state in details.

## World State

The world state (`#STATE`) is like a map that links 160-bit addresses to account states. Account states are represented as [RLP (Recursive Length Prefix)](#recursive-length-prefix) serialized data structures.  RLP is the primary encoding method used to serialize objects in Ethereum's execution layer.

Each account in Ethereum is individually represented in the world state as a map with the following keys: account address to values: nonce, balance, storage hash, and code hash.

While it's not stored directly on the blockchain (because the blocks only maintain the state root, not the entire state), it's assumed that the system will maintain this map using a modified [Merkle Patricia trie](#modified-merkle-patricia-trie). Merkle Patricia Trie is a deterministic cryptographically authenticated trie data structure that is used to store all (key, value) bindings. Ethereum uses it in account's storage, world state, etc. 

This trie relies on a simple database backend (Ethereum uses LevelDB) that tracks byte arrays and their corresponding byte arrays, known as the "state database." This approach has several advantages:

1. The root node's hash of the merkle patricia trie serves as a secure identifier for the entire state, depending on all internal key:value bindings inside it.
2. As an immutable data structure, we can access any previous state by adjusting the root hash.
3. Storing all root hashes on the blockchain makes reverting to older states straightforward.

### Account State

An account is generally categorized, as it can be both an EOA or a Smart Contract for which its state, `#STATE[ACCOUNT]`, consists of four fields:

1. **nonce**: A scalar value equal to the number of transactions sent from this address or, in the case of accounts with associated code (Smart Contract Accounts), the number of contract-creations made by this account. For account of address `ACCOUNT` in state `#STATE`, this would be denoted as, 
    ```
    #STATE[ACCOUNT_nonce]
    ```
2.  **balance**: A scalar value indicating the amount of Wei owned by the account. Denoted as,

    ```
    #STATE[ACCOUNT_balance]
    ```
   
3. **storageRoot**: A 256-bit hash of the root node of a Merkle Patricia trie encoding the storage contents of the account. The Merkle Patricia trie includes a mapping between various 256-bit integer keys and RLP-encoded 256-bit integer values as storage slots. Denoted as,

    ```
    #STATE[ACCOUNT_storageroot]
    ```

4. **codeHash**: The hash of the EVM (Ethereum Virtual Machine) code for this account, which gets executed when the address receives a message call. The code is stored in the state database under corresponding hashes for retrieval. The code in arbitrary sequence of bytes are denoted as `..code..` and the codeHash is denoted as,

    ```
    !SPL-FUNC_KEC(..code..) = #STATE[ACCOUNT_codehash]
    ```


> **Conventions used** : An `ACCOUNT` tuple is a set of scalar/fixed byte values (nonce, balance, storageRoot, codeHash), but when we refer to just the address - a scalar value, we call it `account`.

### Account storageRoot

We often want to talk about the actual data stored as a trie (set of key/value pairs stored within), not just the root hash.

The intermediate keys are a fixed sequences of bytes, up to 32 bytes long. The values associated with these keys are non-negative integers, either 0 or any positive number. We represent this as:

```
key=<BYTE{32}> AND value=<NON-NEG-INT{}>
```

To access the individual key-value pairs within an account's storage root, we prepare the merkle patricia trie to retrieve a particular key:value binding of the contents that produced the storageRoot. The `!PREPARE` function process looks like this:

```
!PREPARE((key,value))=((!SPL-FUNC_KEC(key), !SPL-FUNC_RLP(value)))
```

Since the root hash is typically used to calculate the world state hash, and storage writes happen to individual key-value pairs in the account's storage trie, we define `!PREPARE*` as the element-wise transformation of the base function `!PREPARE` for each element in the trie. An element wise transformation can update the values associated with the key which inturn updates the root node hash which is the storageRoot. 


```
!SPL-FUNC_TRIE(!PREPARE*(#STATE[ACCOUNT_storageroot]))= #STATE[ACCOUNT_storageroot]
```

It's important to note that `#STATE[ACCOUNT_storageroot]` is not a physical part of the account and doesn't contribute to its later serialization.

> **Note**: To follow the paper, learn that for every function we prefix with exclamation ! and for special functions we prefix with !SPL-FUNC_

### Account CodeHash

If the **codeHash** field is the Keccak-256 hash of the empty string, then the node represents a simple account, often called a "non-contract" account or "externally owned account (EOA)." It can be defined as:

```
#STATE[ACCOUNT_codehash] = !SPL-FUNC_KEC(())
```

### Preparing World State

We can define a function called `!PREPARE_#STATE` to handle world-state prepare function which is also commonly referred to the collapse function:

```
!PREPARE_#STATE = {POWERSET(ACCOUNT) where, #STATE[ACCOUNT] != NULL}
```

> **Note**: If and only the state is referenced by an account i.e., `#STATE[ACCOUNT]` it is an account's state, else it is denoted as world state.

This `!PREPARE(#STATE)` function uses a [power set](https://en.wikipedia.org/wiki/Power_set), representing all subsets of accounts and its state variables. It can be defined as the power set of accounts is equal to the key-which is a Keccak-256 hash and the RLP encoded value of nonce, balance, storageRoot, and codeHash.

```
POWERSET(ACCOUNT) = (!SPL-FUNC_KEC(ACCOUNT), !SPL-FUNC_RLP((#STATE[ACCOUNT_nonce], #STATE[ACCOUNT_balance], #STATE[ACCOUNT_storageroot], #STATE[ACCOUNT_codehash])))
```

This function, `!PREPARE_#STATE`, is used alongside the trie function to provide a short identity (hash) of the world state. The world state only to identify and to validate in a block of transactions which is deemed as immutable uses a short identity hash, although it is actually includes the merkle patricia trie of all accounts state.

The `!PREPARE_#STATE` function, along with the trie function, helps generate a short identity (hash) for the world state. To validate an account as valid, we assume an account validity function as `!VALIDITY(#STATE[ACCOUNT])`

The world state `#STATE` should only contain valid accounts which is either null or has a 20 byte account address with the `!VALIDITY` function output as true.

```
for all ACCOUNT where, #STATE[ACCOUNT] = NULL or (account= BYTE{20} AND !VALIDITY(#STATE[ACCOUNT]) )
```

For a valid account, the `!VALIDITY` function should check these requirements:

1. `ACCOUNT_nonce` should be a non-negative integer with maximum length of 256 bits. 
    ```
    ACCOUNT_nonce = <NON-NEG_INT{256}>
    ```
2. `ACCOUNT_balance` should be a non-negative integer with maximum length of 256 bits.
    ```
    ACCOUNT_balance = <NON-NEG_INT{256}>
    ```
3. `ACCOUNT_storageroot` should be a byte array with maximum length of 32 bytes.
    ```
    ACCOUNT_storageroot = <BYTE{32}>
    ```
4. `ACCOUNT_codehash` should be a byte array with maximum length of 32 bytes.
    ```
    ACCOUNT_codehash = <BYTE{32}>
    ```

There can be accounts which state can be empty or dead. Some accounts like Pre-compiled contracts can have an empty account state i.e., it has no codehash, zero nonce and zero balance. This is because their account states do not usually contain the code describing its behavior. E.g., SHA256 which is not actually presented as an opcode, but rather as a pre-compile contract with a fixed gas unit cost that can be callable by other smart contract accounts through their code. These Empty accounts are defined as the codehash should be equivalent to an empty string's Keccak-256 hash with the the account's nonce and balance as 0.

```
!SPL-FUNC_EMPTY(#STATE, ACCOUNT) = #STATE[ACCOUNT_codehash] = !SPL-FUNC_KEC(()) AND #STATE[ACCOUNT_nonce]=0 AND #STATE[ACCOUNT_balance]=0
```

An account is considered dead when its account state is either non-existent or empty. A dead account is defined as,

```
!SPL-FUNC_DEAD(#STATE, ACCOUNT) = #STATE[ACCOUNT] = NULL OR !SPL-FUNC_EMPTY(#STATE, ACCOUNT)
```

## The Transaction

A transaction `TX` is a single cryptographically-signed instruction constructed by an actor externally to the scope of Ethereum. Externally defines that the transaction is constructed and signed outside the Ethereum Protocol i.e., digital signature that validates a simple account's ownership. Importantly, the sender of a transaction cannot be a smart contract; it must originate from a non-contract source.

Although we assume that the ultimate external actor is typically a human, the actual creation and distribution of transactions often involve software tools. It's worth noting that these "tools" could potentially become so disconnected from their human creators, or humans could become so detached from their actions, that they might be considered autonomous agents at some point. For example, contracts might offer rewards to humans for sending transactions to trigger their execution, blurring the line between human and autonomous agent involvement in the Ethereum network.

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718), proposed by Micah Zoltu, introduced the concept of different transaction types within the Ethereum protocol. As of the Berlin version, there are two main transaction types: Type 0 (referred to as "legacy") and Type 1 (introduced by [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) by Buterin and Swende).

Additionally, these transactions (whatever their type maybe) can be further categorized into two subtypes:
1. Transactions that lead to message calls.
2. Transactions that result in the creation of new accounts along with associated code, informally known as "contract creation."


In Ethereum, all transaction types specify a number of common fields:

1. **type**: This field distinguishes between different transaction types and further future types - a scalar number value between 0 and 0x7f, for a total of 128 possible transaction types. We can define it as `TX_type`.

2. **nonce**: A scalar value equal to the number of transactions sent by the sender (external actor). Can be defined as `TX_nonce`
   
3. **gasPrice**: The price in Wei units, a scalar value that the sender is willing to pay for each unit of "gas" incurred as a result of the execution of this transaction; defined as `TX_gasprice`.
  
4. **gasLimit** The maximum amount of gas that this transaction can use to execute. It's a fixed value, paid upfront before any computation starts, and it can't be increased later. Defined as `TX_gaslimit`.

5. **to**: In the case of a message call, this is the 160-bit (20 byte) address of the recipient. For contract creation transactions, it's represented as `NULL`, which is equivalent to the only member of `BYTE{0}`. We'll denote this as `TX_to`.

6. **value**: This scalar value represents the amount of Wei to be transferred to the message call's recipient `TX_to`. In contract creation since the "to" field is NULL it acts as an endowment to the newly created account. We'll define this as `TX_value`.
   
7. **r, s**: These values corresponds to the signature of the transaction and used to determine and verify authenticity of the sender of the transaction; defined as {`TX_r-sig` and `TX_s-sig`}. This is expanded in [Signing Transactions](#signing-transactions).

### Transaction Types

Additional Transaction types are proposed in EIP-2718 with full backwards compatibility to the existing protocol. This ensured that different transaction types with additional fields can be introduced, such as EIP-2930 which provides users to add an access list of account addresses and its storage keys that the transaction may access. It reduces gas costs, although if the storage keys and addresses are not accessed are also paid upfront and cannot be refunded.

For EIP-2930 the type is given as "1" `TX_type = 1`, where, its transactions include additional fields:

1. **accessList**: List of access entries to warm up and reduce overhead; defined as `TX_..accesslist..`. Each access list entry `ENTRY[n]` is a tuple of an account address and a list of storage keys: `ENTRY[n]=(ENTRY_account, ENTRY_storage)` as there'll be a vast number of keys collapsed (bundled) together in a storageRoot. 
   
2. **chainId**: Chain ID; defined as `TX_chainid`. Must be equal to the network chain ID which is a scalar value.

    > **Note**: Since blockchains that integrate Ethereum protocol specification are multiples in live mainnets and testnets, the transaction should specify the chainID to avoid replay attacks. Ethereum Mainnet chainID is 1, you can find the list of chainIDs [here](https://chainid.network/)

3. **yParity**: Signature Y parity, which is either 0 or 1 (odd or even), depending on which point on the elliptic curve should be used; defined as `TX_yparity`.

Legacy transactions of type "0" `TX_type = 0` do not have an **accessList** `T_accesslist= NULL`. But **chainId** and **yParity** for legacy transactions are combined into a single value:

> **Note**: Pre-EIP155 ethereum transactions signature are denoted as v,r,s, where v is the chainID and yParity, post-EIP155 with the introduction of different transaction types it is denoted as value "w"

1. **w**: A scalar value encoding Y parity and chain ID; denoted as `TX_w-encoded`. For Legacy transactions it would be as defined in [EIP-155](https://eips.ethereum.org/EIPS/eip-155) by Buterin as,

    ```
    TX_w-encoded = 27+TX_yparity or 2*(TX_chainid)+35+TX_yparity
    ```

> **Note**:The confusion arises why 27 is used? because both encoding methods were used in Ethereum at different points in its history. EIP-155 introduced the more secure chainID encoding to improve security and prevent cross-chain replay attacks. However, some tools and services may still use the legacy encoding for compatibility with older transactions. Hence `27+TX_yparity` is preserved for backwards compatibility

### Message Calls

A message call can be simple transfers of Wei from one account to another, or a contract creation, or a contract execution transaction. The message call's intention is identified via the following field:

1. **data**: An arbitrary-sized byte array that specifies the input data of the message call, defined as `..TX_data..`.

Both the message call's instruction to execute the code or the a contract creation is given in the same field but recognized by the `TX_to` value. The contract creation transaction doesn't includes a `TX_to` value and it is `NULL`. This is how the Ethereum protocol determines if a transaction is a message call or a contract creation. Also understand that for simple ether (Wei) transfer, also a message call where the `..TX_data..` value is NULL, but the `TX_to` value is given.

When creating a contract, whether through a legacy method or EIP-2930, the transaction includes the following component:

1. **init**: This is an arbitrary-sized byte array containing contract code responsible for initializing the contract. We'll denote it as  `..TX_init..`.

The **init** code is a fragment of EVM code that runs only once during the contract's creation. Its primary role is to set up the contract's initial state, define storage variables, and perform any necessary setup tasks.
After execution, the init code is discarded, leaving behind the initialized contract.

The second fragment of the code, the **body** executes each time the contract account receives a message call which can be a transaction created and signed by an external actor of a simple account / EOA account or through internal execution of code, can be cross-contract calls.

The init code performs tasks like initializing storage variables defined in the contract's constructor function. Some values in this code may be immutable or need to be stored before any external message calls. Therefore, the init code executes solely during contract creation.

### Transaction Sender

[Signing Transactions](#signing-transactions) section specifies the function `!SENDER`, which maps transactions to the sender via the ECDSA of the Secp-256k1 curve, using the hash of the transaction (excepting the latter three signature fields) as the datum to sign. 

Signature is a function that takes input of the hash of the serialized transaction except the three fields `TX_r-sig`, `TX_s-sig`, `TX_yparity` and produces the three outputs. In Ethereum Transactions the sender account address is not explicitly included in the transaction datum, instead from the signature fields the nodes validating the transactions derive it. We can define that the sender of a given transaction `TX` can be represented as `!SENDER(TX)`.

### Preparing Transactions

For identifying transaction's type and further define prepare function for transactions. We can denote it as,

If `TX_type = 0`,
```
!PREPARE_TX(TX) = (TX_nonce, TX_gasprice, TX_gaslimit, TX_to, TX_value, ..TX_message.., TX_w-encoded, TX_r-sig, TX_s-sig)
```

If `TX_type = 1`,
```
!PREPARE_TX(TX) = (TX_chainid, TX_nonce, TX_gasprice, TX_gaslimit, TX_to, TX_value, ..TX_message.., TX_..accesslist.., TX_yparity, TX_r-sig, TX_s-sig)
```

To identify the message call's intention we define a `..TX_message..` value which is an arbitrary-sized byte array where if `..TX_data.. = NULL` it is `..TX_init..` - the initialization of a contract code OR `..TX_data..` otherwise which represents an execution of initialized code.

While encoding the values of the transaction fields, RLP-encoding is used `!SPL-FUNC_RLP(TX)` as integer values except the access list `TX_..accesslist..` and the arbitrary-sized byte arrays `TX_init`, `TX_data`.

1. **type**: `TX_type = <{0,1}>`
2. **chainID**: `TX_chainid = chainid`
3. **nonce**: `TX_nonce = <NON-NEG-INT{256}>`
4. **gasPrice**: `TX_gasprice = <NON-NEG-INT{256}>`
5. **gasLimit**: `TX_gaslimit = <NON-NEG-INT{256}>` 
6. **value**: `TX_value = <NON-NEG-INT{256}>` 
7. **w(chainID+yParity)**: `TX_w-encoded =<NON-NEG-INT{256}>` 
8. **r(Signature Value)**: `TX_r-sig = <NON-NEG-INT{256}>` 
9. **s(Signature Value)**: `TX_s-sig = <NON-NEG-INT{256}>`
10. **yParity**: `TX_yparity = <NON-NEG-INT{1}>`
11. **data**: `..TX_data.. = <BYTE{....}>` 
12. **init**: `..TX_init.. = <BYTE{....}>` 

    The values of different fields with different maximum length in non-negative integers denoted as n `NON-NEG-INT{n}`, should be an non-negative integer AND should be lesser than 2^n value. This is defined as

    ```
    TX_field = NON-NEG-INT_n where, TX_field = <NON-NEG-INT> AND < 2^n
    ```
13. **to**: If `TX_to != NULL` then, `TX_to = <BYTE{20}>`, Otherwise `TX_to = <BYTE{0}>`
    
    The `TX_to` address hash behaves slightly differently based on the type of transaction:

    1. In regular transactions, `TX_to` represents a 20-byte address hash `<BYTE{20}>`. It identifies the recipient's Ethereum account address.
    2. In the case of a contract-creation transaction, `TX_to` is equivalent to `NULL`. This signifies that it doesn't point to an existing Ethereum address. Instead, it is represented as the RLP encoding of an empty byte sequence, which is essentially a member of `<BYTE{0}>`.

## The Block

An Ethereum block is the collection of information that includes the header `HEADER`, transactions `..TX..`, and a set of other block headers that are known as _ommers_ `..OMMERS..`. 

> Ommer is a gender-neutral term to mean "sibling of parent". 

A block can contain information about its ommer block's header, since a same block number can be mined/produced by different nodes and select longest chain by fork-choice rule. If a new block producer's node has information about the ommers, it shall include it. It is similar to Bitcoin's orphan blocks, but in the Ethereum protocol it includes it in the blockchain's ledger.

The block's header `HEADER` contains several fields of information:

1. **parentHash**: The Keccak 256-bit hash of the parent block's header, in its entirety; defined as `HEADER_parenthash`.
2. **ommersHash**: The Keccak 256-bit hash of the ommers list portion i.e., the sibling blocks of the parent block of this block; defined as `HEADER_ommershash`.
3. **beneficiary**: The 160-bit address (20 byte) to which all fees collected from the successful mining of this block be transferred, typically the miner/producer; defined as `HEADER_beneficiary`.
4. **stateRoot**: The Keccak 256-bit hash of the root node of the state trie `#STATE`, after all transactions are executed and finalisations applied to the world state; defined as `HEADER_stateroot`.
5. **transactionsRoot**: The Keccak 256-bit hash of the root node of the trie structure populated with each transaction in the transactions list portion of the block, not to be confused with stateRoot as transactionsRoot only denotes the transactions of this block; defined as `HEADER_transactionsroot`.
6. **receiptsRoot**: Each transaction in this block's transaction list after execution shall return a receipt, the receipts are structured in trie and the Keccak 256-bit hash of the root node of the trie structure is the receiptsRoot; defined as `HEADER_receiptsroot`.
7. **logsBloom**: The Bloom filter composed from indexable information  such as the logger address (assuming that smart contracts emit events as logs or modification to state) and log's topics which is contained in each log entry from the receipt of each transaction in the transactions list; defined as `HEADER_logsbloom`.
8. **difficulty**: A scalar value corresponding to the Proof of Work difficulty level of this block. This can be calculated from the previous block's difficulty level and the timestamp (Unix time); defined as `HEADER_difficulty`.
9. **number**: Commonly referred as Block Height, a scalar value equal to the number of ancestor blocks. The genesis block (first block of the chain) has a number of zero; defined as `HEADER_blocknum`.
10. **gasLimit**: A scalar value equal to the current limit of gas expenditure per block, maximum allowed gasLimit by consensus agreement among nodes; defined as `HEADER_gaslimit`.
11. **gasUsed**: A scalar value equal to the total gas used in transactions in this block which is the sum of all transactions gasUsed; defined as `HEADER_gasused`.
12. **timestamp**: A scalar value equal to the reasonable (can be accepted) output of Unix's time() at this block's inception; defined as `HEADER_stamp`.
13. **extraData**: An arbitrary byte array containing data relevant to this block. This is restricted to be 32 bytes or fewer; defined as `HEADER_extras`.
14. **mixHash**: A 256-bit hash which, combined with the nonce, when undergoes verification, proves that a sufficient amount of computation has been carried out on this block i.e., that this block's miner has found the PoW nonce; defined as `HEADER_mixhash`.
15. **nonce**: A 64-bit value which, combined with the mix-hash, proves that a sufficient amount of computation has been carried out on this block; defined as `HEADER_nonce`.

The other two components in the block are simply a list of ommer block headers (of the same format as above), `BLOCK_OMMERS` and a series of the transactions, `BLOCK_TX`. We can define as block `BLOCK` as:

```
BLOCK = (BLOCK_HEADER, BLOCK_TX, BLOCK_OMMERS)
```

### Transaction Receipt

A Transaction Receipt, denoted as `BLOCK_RECEIPT[index]`, where `index` represents the index of the transaction within the block `BLOCK_TX` (i.e., its position in the transactions trie within the block). `RECEIPT` is a tuple  containing essential information about the specific transaction's execution. These receipts are stored off-chain but are associated with on-chain data through the `HEADER_receiptsroot`.

A transaction receipt `RECEIPT` consists of five elements: 

1. **type**: This denotes the type of the transaction (e.g., legacy transaction, EIP-2930, etc.), and it is equivalent to `TX_type`, which specifies the transaction's type. Defined as `RECEIPT_type`
2. **statusCode**: This is a status code that provides information about the outcome of the transaction. It is a non-negative integer and defined as `RECEIPT_status = <NON-NEG-INT{}>`.
3. **cumulativeGas**: This value represents the cumulative gas used in the block containing the transaction receipt. It reflects the total gas consumption by all transactions up to and including the current one, immediately after its execution. It is stored as a non negative integer and defined as `RECEIPT_gascumulative = <NON-NEG-INT{}>`
4. **logs**: These are arbitrary-sized set of logs created during the execution of the transaction. These logs are presented in a serialized format using RLP encoding. Defined as `..RECEIPT_logs..`
5. **logsBloom**: This is a Bloom filter with a length size of 256 Bytes (2048 bits), defined as `RECEIPT_logsbloom = <BYTE{256}>` is a hash constructed from the information contained in the transaction's logs. It is represented in RLP format and serves as an efficient data structure for indexing and searching specific log entries within Ethereum.

```
RECEIPT = (RECEIPT_type, RECEIPT_status, RECEIPT_gascumulative, ..RECEIPT_logs.., RECEIPT_logsbloom)
```

The function `!PREPARE_RECEIPT` prepares a transaction receipt for being transformed into an RLP-serialized byte array to be stored on the database for further retrieval and verification:

```
!PREPARE_RECEIPT(RECEIPT)= (RECEIPT_status, RECEIPT_gascumulative, ..RECEIPT_logs.., RECEIPT_logsbloom)
```


#### Receipt Logs

In the Ethereum Protocol, logs are records of events emitted/generated during the execution of transactions and smart contracts. These logs are organized into a sequence referred to as `RECEIPT_logs`. Each log entry, represented as `LOG-ENTRY`, is a structured tuple comprising several key elements:

1. **address**: The address of the entity responsible for generating the log entry. This address is presented as a 20-byte sequence array i.e., the Ethereum account address format. Denoted as, `LOG-ENTRY_account = <BYTE{20}>`.
2. **topic**: Log entries can have topics associated with them. A topic is a series of 32-byte log topics, and there can be multiple topics, denoted as `LOG-ENTRY_topic_n = <BYTE{32}>`, where 'n' signifies the index of the topic of 32 byte max sequence. Topics comprise an unlimited list of topics which is arbitrarily sized, denoted as `..LOG-ENTRY_topic..`
3. **data**: The data field in a log entry accommodates an arbitrary-sized collection of bytes. It serves as a flexible container for storing relevant information or data associated with the event. Denoted as, `..LOG-ENTRY_data.. = <BYTE{}>`.

The overall sequence of log entries, `RECEIPT_logs`, is  a series structured as follows:

```
RECEIPT_logs = LOG-ENTRY_1, LOG_ENTRY_2,....
```
and each log entry is a tuple consisting of,
```
LOG-ENTRY = (LOG-ENTRY_account, ..LOG-ENTRY_topic.. , ..LOG-ENTRY_data..)
```
where
```
..LOG-ENTRY_topic.. = LOG-ENTRY_0, LOG-ENTRY_1,..
```

#### Bloom Filter on Logs

Since logs of transaction receipts `BLOCK_TX_RECEIPT_logs` are vast amount of data that cannot be included in a block but can be stored offchain similar to the state trie. Ethereum protocol uses bloom filter `!BLOOM-FILTER` to provide users the option to query if a log is present or not using bloom filters that are stored as a short identifier onchain in block header via block's receipts root. To avoid false positives (since bloom filters are probabilistic in nature) each log entry is reduced to a single 256 bytes of length (2048 bits array) which can be proved for a log entry's fields to exist probabilistically with a potential matching.  

Each log's element to verify belongs to an arbitrary byte sequence `..LOG-ENTRY_element.. = <BYTE{}>` inside the union set of `LOG-ENTRY_account` and `..LOG-ENTRY_topic..`. Hence we can denote the element as,

```
..LOG-ENTRY_element.. exists IF ..LOG-ENTRY_element.. = <LOG-ENTRY_account UNION ..LOG-ENTRY_topic..>
```

To produce the bloom filter 256 byte hash, we define the Bloom filter function, `!BLOOM-FILTER`, to reduce a log entry into a single 256-byte hash,

```
!BLOOM-FILTER(LOG-ENTRY)= !BLOOM-FILTER_3:2048(..LOG-ENTRY_element..) 
```

The function `!BLOOM-FILTER` sets three bits out of 2048 bits `3:2048` for an element of arbitrary byte sequence. Commonly bloom filters take multiple hash functions, but in case of Ethereum we use a **specialized bloom filter** that uses Keccak-256 hash function `!SPL-FUNC_KEC` to hash the log entry's byte sequence of arbitrary length and take the low-order 11 bits of each of the first three pairs of bytes.

> Since `2048 = 2^11` (11 bits), and the low-order 11 bits is the modulo 2048 of the operand, which is in this case is "each of the first three pairs of bytes in a Keccak-256 hash of the byte sequence.

The resulting byte array would be a 256 byte (2048 bits) long, initialized as `LOG-ENTRY_bloomreturn = (0,0,..0)`. To apply bloom filter for the receipt we would take each element and produce the bit array's index number `BIT-REFERENCE_index` that should be changed to "1" from the first three byte pairs from hashing the element `!SPL-FUNC_KEC(LOG-ENTRY_element)` and produce the `bloomreturn`.

```
!BIT-REFERENCE_index(LOG-ENTRY_bloomreturn) = 1 
```
After Each range gives us the Bit Reference index of `LOG-ENTRY_bloomreturn` which refers to the three pair of byte i.e., three pairs of 2 hexadecimal characters from `!SPL-FUNC_KEC(LOG-ENTRY_element)` hash's hexadecimal index {0,1}, {2,3}. {3,4} which provides three 8-bit pair
```
!SPL-FUNC_KEC(LOG-ENTRY_element) for each range mod 2048
```
From, each range we would convert the binary representation to decimal and take the modulo operator of 2048 to identify the bit reference index number `BIT-REFERENCE_index` and update the `bloomreturn`. Notably, the `LOG-ENTRY_element` is treated as a big-endian (significant bits stored as first in the sequence of bytes).


### Holistic Validity

A block specified in the ethereum protocol is only assumed to be valid only if it satisfies several conditions that the block must be internally consistent with the ommer `BLOCK_OMMER`, the transactions block header `BLOCK_HEADER`, and the given transactions `BLOCK_TX` (as specified in [Block Finalization](#block-finalization) section). When the block executed in the order of transactions on the base state `#STATE` (derived from the final state from the block's parent block state) results in a new state with the short identity `BLOCK_stateroot`. All the conditions must result in true to say a block is valid.

#### Valid State Root

The **stateRoot** scalar field of the block's header `HEADER_stateroot` is only valid from the resulting 32 byte root node hash of the trie of the prepared state (using the world state prepare function  `!PREPARE_#STATE`), where the block-level state transition is applied on the parent block's final state `#STATE` and the current block i.e., the block's transactions to be specific.

```
HEADER_stateroot = !SPL-FUNC_TRIE(!PREPARE_#STATE(#BLOCK_ST(#STATE, BLOCK)))
```

#### Valid Ommers Hash

The **ommersHash** scalar field of the block's header `HEADER_ommershash` is only valid if the Keccak-256 hash applied to the RLP serialized byte-array block hash of the ommers blocks (sibling blocks of the parent block) of the new block.  

```
HEADER_ommershash = !SPL-FUNC_KEC(!SPL-FUNC_RLP(!PREPARE*_HEADER(BLOCK_OMMERS)))
```

#### Valid Transactions Root

The **transactionsRoot** scalar field of the block's header `HEADER_transactionsroot` is only valid if the trie root node hash of transactions trie where `key = <NON-NEG-INT{}>` is the key and the value is the RLP encoded serialized transaction `TX_index`, is denoted as,

```
HEADER_transactionsroot = !SPL-FUNC_TRIE(!SPL-FUNC_RLP-PAIR_TX(key, BLOCK_TX[index]))
```
where index is an element of non-negative integers i.e., the transaction index in the block, denoted as `index = <NON-NEG-INT{}>`, where index should be less than the length of sequence of block's transactions, denoted as `for all index < ||BLOCK_TX||`. The `!SPL-FUNC-RLP-PAIR(key, value)` denotes that the RLP is pairwise i.e., for each transaction and it differs for legacy and EIP-2718 transaction types.

If `TX_type = 0`

```
!SPL-FUNC_RLP-PAIR(key, TX) = (!SPL-FUNC_RLP(key), !SPL-FUNC_RLP(#PREPARE_TX(TX))) 
```

If `TX_type = 1` or otherwise

```
!SPL-FUNC_RLP-PAIR(key, TX) = (!SPL-FUNC_RLP(key), (TX_type)+!SPL-FUNC_RLP(#PREPARE_TX(TX))) 
```
where, `+` is the concatenation of byte arrays.

#### Valid Receipts Root

The **receiptsRoot** scalar field of the block's header `HEADER_receiptsroot` is only valid if the trie root node hash of receipts trie where `trie-index` is the key and the value is the RLP encoded serialized receipt `RECEIPT_index`, is denoted as,

```
HEADER_receiptsroot = !SPL-FUNC-TRIE(!SPL-FUNC_RLP-PAIR_RECEIPT(key, BLOCK_RECEIPT[index]))
```

index is an element of non-negative integers i.e., the transaction index in the block, denoted as `index = <NON-NEG-INT{}>`, where index should be less than the length of sequence of block's receipts, denoted as `for all index < ||BLOCK_RECEIPT||`. The `!SPL-FUNC_RLP-PAIR_RECEIPT` differs for transaction types and is defined as,


If `TX_type = 0`

```
!SPL-FUNC_RLP-PAIR(key, RECEIPT) = (!SPL-FUNC_RLP(key), !SPL-FUNC_RLP(#PREPARE_RECEIPT(RECEIPT))) 
```

If `TX_type = 1` or otherwise

```
!SPL-FUNC_RLP-PAIR(key, RECEIPT) = (!SPL-FUNC_RLP(key), (RECEIPT_type)+!SPL-FUNC_RLP(#PREPARE_RECEIPT(RECEIPT))) 
```


#### Valid Logs Bloom

The **logsBloom** scalar field of the block's header `HEADER_logsbloom` is the union of all the transaction receipts bloom filter result `LOG-ENTRY_bloomreturn` combined to a 256-Byte format (2048 bits) to efficiently query the logs element that is exists in the block, since bloom filters are probabilistic this can result false positives also. 

The extra data that's produced from executing the transactions specifically the transaction receipts `RECEIPT` and the block-level state accumulation function `#BLOCK-ST` are discussed later in [State & Nonce Validation](#state--nonce-validation) section.


### Serialization

Serialization is used to encode various or multiple data into an encoded single byte array of a fixed or arbitrary length to carry out for external functions or validation purposes. We define the functions `!PREPARE_BLOCK` for block preparation and function `!PREPARE_HEADER` for block header preparation. We will define the order and the types of the structure for which RLP encoding/transformation is required.

#### Preparing Header

The order of header's fields to be serialized using RLP encoding are given as 

```
!PREPARE_HEADER(HEADER) = (HEADER_parenthash, HEADER_ommershash, HEADER_beneficiary, HEADER_stateroot, HEADER_transactionsroot, HEADER_receiptsroot, HEADER_logsbloom, HEADER_difficulty, HEADER_blocknum, HEADER_gaslimit, HEADER_gasused, HEADER_stamp, HEADER_extras, HEADER_mixhash, HEADER_nonce)
```

with its data types defined as, 

`BYTE{32}` fields are `HEADER_parenthash, HEADER_ommershash, HEADER_stateroot, HEADER_transactionsroot, HEADER_receiptsroot, HEADER_mixhash` . `BYTE{20}` fields are `HEADER_beneficiary`. `BYTE{256}` field is `HEADER_logsbloom`. `BYTE{8}` field is `HEADER_nonce`. `NON-NEG_INT{}` fields are `HEADER_difficulty, HEADER_blocknum, HEADER_gaslimit, HEADER_gasused`. `BYTE{}` field is `HEADER_extras`

#### Preparing Block

The order of block's fields to be serialized using RLP encoding are given as 

```
!PREPARE_BLOCK(BLOCK) = (!PREPARE_HEADER(BLOCK_HEADER), !PREPARE*_TX(BLOCK_TX), !PREPARE*_HEADER(BLOCK_OMMERS))
```

where the `BLOCK_TX` and `BLOCK_OMMERS` can have intermediate values to prepare as transactions includes multiples of individually constructed transactions which is already encoded in RLP, and the ommers which can be multiples as siblings are not limited to prevail.

For transactions of type 1 i.e., EIP2718 transactions, the `!PREPARE*TX(TX)` preparation is handled differently such that,

If `TX` includes `TX_type = 0`

```
!PREPARE*TX(TX) = !PREPARE*TX(TX)
```
If `TX` includes `TX_type = 1` or otherwise

```
!PREPARE*TX(TX) = TX_type + !SPL-FUNC_RLP(!PREPARE*TX(TX))
```

where the transaction type and the RLP serialized transaction is concatenated when preparing the block of transactions. And also since `!PREPARE_TX` and `PREPARE_HEADER` is an element wise sequence transformation, it is defined for any function `!FUNC` as

```
!FUNC((x_0, x_1,...)) = (!FUNC(x_0), !FUNC(x_1,...))
```

In a prepared block of arbitrarily sized byte array sequence `BYTE{n}` should be an element of `BLOCK` and has a length `||BLOCK||` in bytes which is given as `n` of `BYTE{n}`. Hence all the byte sequence should be a byte array included in the block encoded in RLP specification.

We have defined the specification for constructing a formal block in ethereum protocol. The RLP function `!SPL-FUNC_RLP` (see [RLP section](#recursive-length-prefix)) provides the preferred method for transforming this structure of byte arrays in order of pre-defined types into a sequence of bytes ready for gossipping/transmission over a the network to every node connected via a P2P network and to store locally for further references.


### Block Header Validity

#### parentHash 

We define `HEADER_parenthash` which is the Keccack-256 hash of the RLP encoded block header `!SPL-FUNC_KEC(!SPL-FUNC_RLP(BLOCK'_HEADER))` to be the parent block of `BLOCK`   , defined as,

```
PARENT(HEADER) -> HEADER_parenthash
```

> The ' prime mark represents intermediate values of blocks, in this specific case it represents the parent block

#### number

The block number is the parent's block number incremented by one, defined as

```
HEADER_blocknum = PARENT(HEADER)_(HEADER_blocknum) +1
```

#### difficulty

The canonical difficulty of a block of header `HEADER` is defined as `DIFFICULTY`. Difficulty is synonymous with Proof of Work and ethereum protocol have introduced multiple upgrades to resolve block time related bugs and also to prepare the ethereum blockchain for proof of stake transition. 

The Ethereum protocol defines the minium difficulty as
```
DIFFICULTY_min = 2^17
```

The upgrades are stated below
1. **Homestead** : After the Frontier Release (Ethereum Genesis), in two months the protocol saw majority of miners were mining blocks that contained `HEADER_stamp = PARENT(HEADER)_stamp + 1`,this made miners to continue mining with the same rule of block time median of 13 seconds but the mean started to increase. If 51% miners do this way, the mean will go to infinity. Hence the Homestead upgrade is done to avoid this by involving the use of `PARENT(HEADER)_stamp`. In the Homestead upgrade proposed by Vitalik Buterin on [EIP-2](https://eips.ethereum.org/EIPS/eip-2) an exponential difficulty is set `exponential-difficulty` to increase the difficulty for every 100,000 blocks. This also put pressure on Ethereum protocol to transition from Proof of work to Proof of Stake, and this exponential difficulty is also known as "difficulty bomb" or the period as "ice age". Thus the Homestead-fork proposed a way to maintain a dynamic homeostasis of time between blocks by bringing parent block timestamp and an exponential difficulty within the `homestead_difficulty` parameter. 
2. **Byzantium** : The Byzantium Hardfork introduced via two EIPs. The [EIP-100](https://eips.ethereum.org/EIPS/eip-100) by Vitalik Buterin have included a new `adj-factor` to modify the `homestead_difficulty` and also changes the denominator of the `homestead_difficulty` algorithm to assert that the uncle blocks (ommers) also should be issued at an advised mean block time without manipulating it by miners. The [EIP-649](https://eips.ethereum.org/EIPS/eip-649) have explained the "difficulty bomb" and "ice age" delays the exponential difficulty by adjusting the difficulty by around 3 million blocks to provide more time to transition the Ethereum protocol to Proof of Stake. This difficulty delay introduced a fake-block number as a modified block header's number `fake-blocknum = HEADER'_blocknum`, denoted by prime mark. This reduction of exponential difficulty reduced the time-difference between blocks and avoided network freeze up with higher difficulty that can't be achieved in the stipulated block time.
3. **Constantinople** : The [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) have further delayed the `exponential-difficulty` by adjusting the difficulty by 5 million blocks after the Constantinople-fork due to delays in proof of stake transition.
4. **MuirGlacier** : The [EIP-2384](https://eips.ethereum.org/EIPS/eip-2384) have further delayed the `exponential-difficulty` by adjusting the difficulty by 9 million blocks after the Constantinople-fork due to delays in proof of stake transition.
5. **London** : The [EIP-3554](https://eips.ethereum.org/EIPS/eip-3554) have further delayed the `exponential-difficulty` by adjusting the difficulty by 9.7 million blocks after the Constantinople-fork due to delays in proof of stake transition. 
6. **ArrowGlacier** : The [EIP-4345](https://eips.ethereum.org/EIPS/eip-4345) have further delayed the `exponential-difficulty` by adjusting the difficulty by 10.7 million blocks after the Constantinople-fork due to delays in proof of stake transition. 
7. **GrayGlacier** : The [EIP-5133](https://eips.ethereum.org/EIPS/eip-5133) have further delayed the `exponential-difficulty` by adjusting the difficulty by 11.4 million blocks after the Constantinople-fork due to delays in proof of stake transition. 

The `adj-factor` which allows the Parent Blocks Ommer blocks (Uncle) blocks to be under the expected mean time is defined as

`adj-factor = 1` IF  `||PARENT(HEADER)_OMMERS|| = 0` 

`adj-factor = 2` IF Otherwise

The Homestead difficulty proposed in EIP-2 and modified in EIP-100 is defined as

```
homestead_difficulty = (adj-factor - [(HEADER_stamp - PARENT(HEADER)_HEADER_stamp) / 9], -99)
```

The Byzantium Hardfork delayed difficulty bomb by introducing a fake block number `Header'_blocknum` by introducing a subtrahend `k`

For each hard-fork k is, 

```
k = 300000 IF FORK_Byzantium <= HEADER_blocknum < FORK_Constantinople
```
```
k = 500000 IF  FORK_Constantinople <= HEADER_blocknum < FORK_MuirGlacier
```
```
k = 900000 IF  FORK_MuirGlacier <= HEADER_blocknum < FORK_London
```
```
k = 970000 IF  FORK_London <= HEADER_blocknum < FORK_ArrowGlacier
```
```
k = 1070000 IF  FORK_ArrowGlacier <= HEADER_blocknum < FORK_GrayGlacier
```
```
k = 1140000 IF  HEADER_blocknum < FORK_GrayGlacier
```
The `HEADER'_blocknum` is the fake block number which defined as
```
HEADER'_blocknum = !MAX(HEADER_blocknum - k, 0)
```

> `!MAX` is the max function takes the highest number value from the given values (a,b)

Exponential Difficulty `exp_difficulty` which is introduced in EIP-2, modified in EIP-100 and then introduced the fake block number in EIP-649 is defined as

```
exp-difficulty = [2^[(HEADER'_number/10000)-2]]
```

Final Equation,

If `HEADER_blocknum = 0` ; For genesis block

```
!DIFFICULTY(HEADER) = 2^64
```

If `HEADER_blocknum` is otherwise ; For other blocks

```
!DIFFICULTY(HEADER) = !MAX(DIFFICULTY_min, PARENT(HEADER)_HEADER_difficulty + X * homestead-difficulty + exponential-difficulty)
```

where `X` is defined as `X = PARENT(HEADER)_HEADER_difficulty / 2048` which is to be multiplied with the `homestead_difficulty`

#### gasLimit

The canonical gasLimit of a block header `HEADER_gaslimit` must fullfil all of these three conditions

**Condition 1:**
```
HEADER_gaslimit < PARENT(HEADER)_HEADER_gaslimit + !FLOOR[PARENT(HEADER)_HEADER_gaslimit / 1024]
```
> The !FLOOR function returns the greatest integer (a real number) 

**Condition 2:**
```
HEADER_gaslimit > PARENT(HEADER)_HEADER_gaslimit - !FLOOR[PARENT(HEADER)_HEADER_gaslimit / 1024]
```
**Condition 3:**
```
HEADER_gaslimit >= 5000
```

#### timestamp

The timestamp field of a block header `BLOCK(HEADER)_HEADER_stamp` is given in Unix's time and must fullfil the condition,

```
HEADER_stamp > PARENT(HEADER)_HEADER_stamp
```

With the `homestead-difficulty` parameters which enforces a homeostasis or self-stabilizes the time between blocks, if the block time period between last two blocks are small the difficulty of proof-of-work computation shall increase and the difficulty shall decrease when the period is too large for the next block stabilizing an average constant rate of blocks mined.

#### nonce

The nonce of a block header `HEADER_nonce` must fullfil this two conditions

**Condition 1**
```
HEADER_nonce <= 2^256/HEADER_difficulty
```

**Condition 2**
```
mixhash = HEADER_mixhash
```

The nonce of the header is derived from three elements,
1. The header without the nonce and mixhash components which is defined as `HEADER_POW-PREPARE`
2. The DAG defined as `..dag..` which is a large data set that's incremented for every X blocks (will be defined in the [Ethash](#ethash) section). This DAG is responsible for the Proof of Work function used in Ethereum which is a modified algorithm of **Dagger-Hashimoto** called as **Ethash** which makes the Proof of Work memory hard by using the DAG fed into the memory space i.e., GPU memory that cannot be carried out by an ASIC.
3. The PoW function, defined as `!SPL-FUNC_POW` (shall be explained further in the [Proof of Work](#mining-proof-of-work) section)

```
(nonce, mixhash) = !SPL-FUNC_POW(HEADER_POW-PREPARE, HEADER_nonce, ..dag..)
```

By applying the PoW function to the required elements, it outputs a array of the first item being the mixhash `HEADER_mixhash` to prove the correct DAG for the block is used and second item being the pseudo-random number `HEADER_nonce`. Where given the approximate uniform distribution in the range `(0, 2^256)`, the expected time to find the nonce will depend on the difficulty `HEADER_difficulty`


This constitutes the foundation of blockchain security, serving as the primary method behind the prevention of malicious nodes from rewriting newly generated blocks that could potentially alter, tamper or "rewrite" the historical ledger. The role of the nonce lies in its necessity to meet these conditions, which, in turn, depends upon the block's content and the transactions it holds. Consequently, the method to produce new, legitimate blocks depends on its difficulty factor and, as time progresses, it requires a computational power approximating to the total computational resources of trustworthy miners of the network.

#### Validity Function

With all conditions required to satisfy the validity of a block header, we define a validity function for the block header as `!VALIDITY(HEADER)` which should fullfil all the conditions below

```
!VALIDITY(HEADER) =

HEADER_nonce <= 2^256/HEADER_difficulty AND mixhash = HEADER_mixhash

AND

HEADER_difficulty = !DIFFICULTY(HEADER)

AND

HEADER_gasused <= HEADER_gaslimit

AND

HEADER_gaslimit < PARENT(HEADER)_HEADER_gaslimit + !FLOOR[PARENT(HEADER)_HEADER_gaslimit / 1024] 

AND 

HEADER_gaslimit > PARENT(HEADER)_HEADER_gaslimit - !FLOOR[PARENT(HEADER)_HEADER_gaslimit / 1024]

AND

HEADER_gaslimit >= 5000

AND

HEADER_stamp > PARENT(HEADER)_HEADER_stamp

AND

HEADER_blocknum = PARENT(HEADER)_(HEADER_blocknum) +1

AND

||HEADER_extras|| <= <BYTE{32}>
```
where `(nonce, mixhash) = !SPL-FUNC_POW(HEADER_POW-PREPARE, HEADER_nonce, ..dag..)`. Also `HEADER_extras` which is used for storing arbitrary data to signal EIP-voting, miner information or any additional data to be added to the block that doesn't come under the Proof of Work validation should be at most 32 Bytes.

# Gas and Payment

To prevent network's resources abused by offering turing-completeness, all executable computation in the Ethereum protocol is subject to fees. Fees are specified in units of *gas* (section [Fee Schedule](#fee-schedule) for the fees in gas units associated with each computation instruction). The programmable execution which incudes creating contracts, executing message calls, accessing account storage and any execution of operations on the stack based virtual machine contains a universally agreed cost in terms of gas units by all nodes on the network.

Each transaction has a specific amount of gas units limit `TX_gaslimit` that it can use in full. This gasLimit of the transaction is the amount of gas units which is purchased from the transaction sender's account. The purchase depends on the gasPrice which is specified in the transaction as `TX_gasprice`. The total purchase shall amount to a amount of Wei by `TX_gaslimit * TX_gasprice`. The transaction shall be considered invalid if the account balance cannot support such purchase. After the transaction execution, the remaining gas units - which accounts to a specific amount of Wei will be refunded to the sender's account, that's why the limit is specified. The Gas and its purchase will not exist outside of the execution of the transaction. Thus, for accounts with trusted code associated, a higher gas limit is set per transaction and left alone to be refunded if any.

Gas in units will not be delivered to *beneficiary* address, which is the account of the miner which receives the rewards and fees. Senders of transactions can specify any gasPrice they wish, and miners are free to reject any transactions they choose not to include in their block. To increase chances of a transaction to be included in a block, the senders can set a higher gasPrice which shall be an incentivization to miners with higher value in Ether to include it in their block. Miners can advertise their minimum gasPrice for which they'll choose the transactions with a priority given to transactions with higher gasPrice. There can be a weighted distribution of globally determined minimum acceptable gasPrice. 


# Transaction Execution

The execution of a transaction is the most complex part of the Ethereum protocol: it defines the state transition function `!ST`. Before the execution of transactions it should pass the initials tests of intrinsic validity. These include:

1.  The transaction is well-formed RLP, with no additional trailing bytes;
2.  The transaction signature is valid;
3.  The transaction nonce `TX_nonce` is valid (equivalent to the current nonce of the sender's EOA account);
4.  The sender account has no contract code deployed i.e., the sender account should have the codeHash of the Keccak-256 hash of an empty string `ACCOUNT_codehash = !SPL-FUNC_KEC(())` (as defined in [EIP-3607](https://eips.ethereum.org/EIPS/eip-3607) by Feist);
5.  The gas limit `TX_gaslimit` is no smaller than the intrinsic gas, `gas_0`, used by the transaction, defined as `TX_gaslimit >= gas_0 `
6.  The sender account balance contains at least the cost, `pay_0` required in up-front payment given in Wei.


Formally, we consider the function `!ST`, with `TX` being a transaction and `#STATE` the state:

```
#STATE' = !ST(#STATE, TX)
```
> [Previously](#the-blockchain-paradigm) in the we defined the new state as #NEW-STATE, since now we established the modified values denoted in prime mark ' we can now define the new state as #STATE'

Thus `#STATE'` is the post-transactional state. A state transition shall only happens when a external actor created transaction executes, hence the state transition function is assumed to be the transaction execution. Hence we define `!ST_gasused` to evaluate to the amount of gas used in the execution of a transaction, and `!ST_logs` to evaluate to the transaction's collected log items (account, topics, data) and `!ST_status` to evaluate to the status code resulting from the transaction (can be either 0-Failed or 1-Sucess) . These will be formally defined later.

## Substate

Along the transaction execution, we collect information that is acted upon immediately following the transaction. We call this the *accrued transaction substate*, or *accrued substate* for short, and represent it as `SUBSTATE`, which is a tuple:

The `SUBSTATE` tuple contents include :
1. `SUBSTATE_..self-destruct..`, the self-destruct set: a set of accounts that will be discarded following the transaction's completion. 
2. `SUBSTATE_..logs..` is the log series: this is a series of archived and indexable 'checkpoints' in VM code execution that allow for contract-calls to be easily tracked by onlookers external to the Ethereum world (such as decentralised application front-ends, APIs, etc). 
3. `SUBSTATE_..touch-accounts..` is the set of touched accounts, of which the empty ones are deleted at the end of a transaction. 
4. `SUBSTATE_refund` is the refund balance, increased through using the `SSSTORE` instruction in order to reset contract storage to zero from some non-zero value. Though not immediately refunded, it is allowed to partially offset the total execution costs.
5. Finally, [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929)  introduced 
   1. `SUBSTATE_..accessed-accounts..`, the set of accessed account addresses.
   2. `SUBSTATE_..ACCESSED-STORAGEKEY..`, the set of accessed storage keys (more accurately, each element of `..ACCESSED-STORAGEKEY..` is a tuple of a 20-byte account address and a 32-byte storage slot).

We can define the `SUBSTATE` as,

```
SUBSTATE = (SUBSTATE_..self-destruct.., SUBSTATE_..logs.., SUBSTATE_..touch-accounts.., SUBSTATE_refund,  SUBSTATE_..accessed-accounts.., SUBSTATE_..ACCESSED-STORAGEKEY..)
```

We define the empty accrued substate `SUBSTATE_0` to have no self-destructs, no logs, no touched accounts, zero refund balance, all precompiled contracts in the accessed addresses, and no accessed storage:

```
SUBSTATE_0 = (NULL, (), NULL, 0, ..pre-compiles.., NULL)
```

where `..pre-compiles..` is the set of all precompiled contracts addresses.

## Execution

We define intrinsic gas `gas_intrinsic`, the amount of gas this transaction requires to be paid prior to execution, as follows:

The total intrisic gas for a particular transaction is the sum of all checks related to the transaction. The exact gas units details are expanded in section [Fee Schedule](#fee-schedule). 

1. **Data's Gas** : We can find if a transaction is a simple ether transfer in which the `TX_data`, which can be the `TX_init` code if not present it shall result on fee schedule - `GAS_txdatazero`. If its present it results on fee schedule - `GAS_txdatanonzero`. This Gas levied on Data can be assumed as a length fee. 

    Defined as,
    ```
    i = <TX_data, TX_init> 
    ```
    ```
    CASE 1 : fee = GAS_txdatazero IF i = 0
    ```
    ```
    CASE 2 : fee = GAS_txdatanonzero otherwise
    ```

    The `TX_init` and `TX_data` means the series of bytes of the transaction’s associated data of a message call or initialisation EVM-code/contract creation transaction,

2. **Create's Gas** : To find if a transaction is creation of a contract where `TX_data = ..<BYTE{}>..` and the to address set to null `TX_to = NULL`

    Defined as, 
    ```
    CASE 1 : fee = GAS_txcreate IF TX_to = NULL
    ```
    ```
    CASE 2 : fee = 0 otherwise
    ```
    where `GAS_txcreate` is only added if the transaction is a contract creation, if not the data is a result of EVM-code


3. **Transaction's Gas** : The total gas units to be used by the transaction.
    ```
    GAS_transaction
    ```

4. **Access's Gas**: EIP-2929 have introduced accesslists of address and its storage keys. When added in the transaction it can warm up the address or the storage slots. The acesslist gas is charged for each address and storage keys as a warm up cost, hence the total accesslist gas is the sum of all accesslist address and its specified storage keys

```
SUM OF ALL (GAS_accesslistaddress + GAS_accessliststorage)
```
The `SUM OF ALL` specifies every accesslist address and its storage keys starts from index 0. It is specified if the address is only given then it should charge gas costs for the address plus its all storgae keys for warm access, but if a certain storage key is mentioned from its address it only should be charged.

Each GAS_x will be defined in section [Fee Schedule](#fee-schedule).


With the total  `gas_intrinsic` a scalar value is found, now we can find the upfront cost provided in Wei units.

The upfront cost is defined as `cost_upfront` where,

```
cost_upfront = TX_gaslimit*TX_gasprice + TX_value
```

Now, the validity of an execution is defined as

```
!SENDER(TX) != NULL 

AND

#STATE[!SENDER(TX)]codehash = !SPL-FUNC_KEC(())

AND

TX_nonce = #STATE[!SENDER(TX)]nonce

AND

gas_intrinsic <= TX_gaslimit 

AND

cost_upfront <= #STATE[!SENDER(TX)]balance

AND

TX_gaslimit <= BLOCK_[HEADER_gaslimit] - !LAST(BLOCK_RECEIPTS)_gascummulative

```

where it asserts that
1. The sender of the transaction derived from the signature should not be null
2. The sender's account's code hash should be the value of the keccak function applied on an empty string (as said in EIP-3607)
3. The TX_nonce should be the state's available sender's nonce
4. The intrisic gas should be lesser than or equal to the transaction's gas limit
5. The upfront cost should be lesser than or equal to the state's available sender's balance
6. The transaction's gas limit should be lesser than the value taken by subtracting the "last receipt item of the block's cummulative gas value" from the block's total gas limit.

We also assume that if `!SENDER(TX) = NULL` then `#STATE[!SENDER(TX)]codehash = !SPL-FUNC_KEC(())`, `#STATE[!SENDER(TX)]nonce = 0`, `#STATE[!SENDER(TX)]balance = 0`
























### Note : I'm rewriting the yellowpaper during my free-time hence this is an ongoing work.