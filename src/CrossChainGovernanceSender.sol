// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IRouterClient, Client} from "../lib/ccip/IRouterClient.sol";

contract CrossChainGovernanceSender {
    event Ping(string info);

    IRouterClient internal immutable router;

    constructor(IRouterClient _router) {
        router = _router;
    }

    function quote(uint64 _chain, address _receiver, string calldata _info) external view returns (uint256) {
        Client.EVM2AnyMessage memory message = createMessage(_receiver, _info);
        return router.getFee(_chain, message);
    }

    function sendPing(uint64 _chain, address _receiver, string calldata _info) external payable {
        Client.EVM2AnyMessage memory message = createMessage(_receiver, _info);
        uint256 fee = router.getFee(_chain, message);
        router.ccipSend{value: fee}(_chain, message);
        emit Ping(_info);
    }

    function createMessage(address _receiver, string memory _info)
        internal
        pure
        returns (Client.EVM2AnyMessage memory)
    {
        return Client.EVM2AnyMessage({
            receiver: abi.encode(_receiver),
            data: abi.encode(_info),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: address(0)
        });
    }
}
