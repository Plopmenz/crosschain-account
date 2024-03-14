// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {OAppReceiver, OAppCore, Origin} from "../lib/LayerZero-v2/oapp/contracts/oapp/OAppReceiver.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract CrossChainGovernanceReceiver is OAppReceiver {
    event Pong(string _message);

    constructor(address _endpoint, address _owner) OAppCore(_endpoint, _owner) Ownable(_owner) {}

    /// @inheritdoc OAppReceiver
    function _lzReceive(
        Origin calldata _origin,
        bytes32 _guid,
        bytes calldata _message,
        address _executor,
        bytes calldata _extraData
    ) internal override {
        (_origin, _guid, _executor, _extraData);
        (string memory message) = abi.decode(_message, (string));
        emit Pong(message);
    }
}
