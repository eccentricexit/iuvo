# Funds Management

Iuvo is a platform for selling and buying medical services and as such requires handling of user's funds. When designing the contract the following concerns were taken into account:

- Withdrawing funds should be protected against reentrancy;
- Interactions with other contracts should follow Check-Effects-Interaction;
- Transfers should favor pull over push transfers;
- Prevent locked up funds.

Instead of implementing and working around constraints in code, a design solution is used: [Kleros'](kleros.io) `kleros-interaction` library and it's `ArbitrableTransaction` contract. This has several advantages:

- Doesn't manage large quantities of funds in a single contract;
- Using audited contracts, avoids developers mistakes when trying to "reinvent the wheel";
- Avoids having to deal with reentrancy problems related to transfering funds.
- Outsourcing funds management means we can revert funds sent to the contract accidently by ommiting `payable` functions.

And finally (though unrelated to security):

- Allows disputes to be resolved using the Kleros system.

# Block Limit DoS

IuvoCore makes use of two struct arrays. Iterating through arrays can be a source of problems and/or attacks since the growth of the array can [prevent the iteration to complete due to gas limits](https://www.reddit.com/r/ethereum/comments/4ghzhv/governmentals_1100_eth_jackpot_payout_is_stuck/).

To prevent this problem, a combination of address and uint mappings are used to reference specific positions in the arrays.

# `msg.sender` in favor of `tx.origin`

The iuvo dapp uses authorization in many critical places: Contract upgradability, circuit breajs, doctor rating, hiring and doctor CRUD operations.

Using `tx.origin` for authorization could have catastrophic consequences as it does not necessarily point to the msg sender. Additionally, it may be completly removed from the Ethereum protocol in the future.

# Solhint, Solium and SmartCheck

Finally, the contracts were tested against static check securtiy tools and linters. These do not provide formal verification.
