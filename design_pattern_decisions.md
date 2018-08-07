# Upgradable Pattern

As much as developers audit and check code for bugs, one can never be completly sure that all components of a dapp will work correctly indefinetly. This problem is further complicated by the constraint of immutability of smart contracts. 

The Iuvo dapp holds precious user information, namely their reputation and public image. This means it is a good idea to trade simplicity for the upgradable smart contracts pattern.

The strategy consists of having a Proxy contract that forwards calls to the most recent version of the contract (defined in `target`) with the use of `DELEGATE CALL`. This means code on `target` will be executed in the context of the Proxy. With this, we can retain user`s data across upgrades.

# Circuit Breaks

If an attack is detected, it is valuable to have a circuit break that can halt operations on the contract until a proper investigation can take place. 

To add this security feature, IuvoCore inherits OpenZeppelin's `Pausable` contract and restricts all relevant functions with the `whenNotPaused` modifier.

Aditionally, the contracts that make up the Upgradable Pattern were also modified to implement these circuit breaks.

# Failing Loudly

Instead of fully executing a function and using if-else to implement business rules, IuvoCore throws errors along with messages by using solidity's `require()`.

# Access Restrictions

Curation, reputation management and rating are dificult things to do on enviroments operating with pseudonyms due to sybil attacks. One way to solve this problem is to use an Oracle.

To restrict which account can call the `setRating`, IuvoCore implements the `onlyRatingOracle` custom modifier.