// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {OAppSender, OAppCore, MessagingFee} from "../lib/LayerZero-v2/oapp/contracts/oapp/OAppSender.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract CrossChainGovernanceSender is OAppSender {
    event Ping(string message);

    constructor(address _endpoint, address _owner) OAppCore(_endpoint, _owner) Ownable(_owner) {}

    function quote(uint32 _dstEid, string calldata _message, bytes calldata _options) external view returns (uint256) {
        return _quote(_dstEid, abi.encode(_message), _options, false).nativeFee;
    }

    function sendPing(uint32 _dstEid, string calldata _message, bytes calldata _options) external payable {
        _lzSend(_dstEid, abi.encode(_message), _options, MessagingFee(msg.value, 0), payable(msg.sender));
        emit Ping(_message);
    }
}
