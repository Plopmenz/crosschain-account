// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {CCIPReceiver, Client} from "../lib/ccip/CCIPReceiver.sol";

contract CrossChainGovernanceReceiver is CCIPReceiver {
    event Pong(string info);

    constructor(address _router) CCIPReceiver(_router) {}

    /// @inheritdoc CCIPReceiver
    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
        (string memory info) = abi.decode(message.data, (string));
        emit Pong(info);
    }
}
