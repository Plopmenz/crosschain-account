// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {CCIPReceiver, Client} from "../lib/ccip/CCIPReceiver.sol";

contract CrossChainAccount is CCIPReceiver {
    error InvalidOriginChainSelector(uint64 received, uint64 expected);
    error InvalidOriginAddress(address received, address expected);

    event Executed(bytes32 indexed messageId, address to, uint256 value, bytes data, bool success, bytes returnValue);

    uint64 public immutable allowedOriginChainSelector;
    address public immutable allowedOriginAddress;

    constructor(address _router, uint64 _allowedOriginChainSelector, address _allowedOriginAddress)
        CCIPReceiver(_router)
    {
        allowedOriginChainSelector = _allowedOriginChainSelector;
        allowedOriginAddress = _allowedOriginAddress;
    }

    /// @inheritdoc CCIPReceiver
    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
        _ensureOriginChainSelectorAllowed(message.sourceChainSelector);
        _ensureOriginAddressAllowed(abi.decode(message.sender, (address)));
        (address to, uint256 value, bytes memory data) = abi.decode(message.data, (address, uint256, bytes));
        (bool success, bytes memory returnValue) = to.call{value: value}(data);
        emit Executed(message.messageId, to, value, data, success, returnValue);
    }

    /// Rejects any messages originating from a different origin chain than the allowed one.
    function _ensureOriginChainSelectorAllowed(uint64 _originChainSelector) internal view {
        if (_originChainSelector != allowedOriginChainSelector) {
            revert InvalidOriginChainSelector(_originChainSelector, allowedOriginChainSelector);
        }
    }

    /// Rejects any messages originating from a different sender (on the origin chain) than the allowed one.
    function _ensureOriginAddressAllowed(address _originAddress) internal view {
        if (_originAddress != allowedOriginAddress) {
            revert InvalidOriginAddress(_originAddress, allowedOriginAddress);
        }
    }
}
