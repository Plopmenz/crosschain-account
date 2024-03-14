import { Address, Deployer, ExecuteInfo } from "../../web3webdeploy/types";
import { padHex } from "../../web3webdeploy/node_modules/viem";

export interface SetSenderPeerSettings
  extends Omit<ExecuteInfo, "abi" | "to" | "function" | "args"> {
  sender: Address;
  reveiver: Address;
  reveiverChainEid: BigInt;
}

export async function setSenderPeer(
  deployer: Deployer,
  settings: SetSenderPeerSettings
): Promise<void> {
  await deployer.execute({
    id: "SetSenderPeer",
    abi: "CrossChainGovernanceSender",
    to: settings.sender,
    function: "setPeer",
    args: [
      settings.reveiverChainEid,
      padHex(settings.reveiver, { dir: "left", size: 32 }),
    ],
    ...settings,
  });
}
