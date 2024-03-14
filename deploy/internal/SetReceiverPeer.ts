import { Address, Deployer, ExecuteInfo } from "../../web3webdeploy/types";
import { padHex } from "../../web3webdeploy/node_modules/viem";

export interface SetReceiverPeerSettings
  extends Omit<ExecuteInfo, "abi" | "to" | "function" | "args"> {
  reveiver: Address;
  sender: Address;
  senderChainEid: BigInt;
}

export async function setReceiverPeer(
  deployer: Deployer,
  settings: SetReceiverPeerSettings
): Promise<void> {
  await deployer.execute({
    id: "SetReceiverPeer",
    abi: "CrossChainGovernanceReceiver",
    to: settings.reveiver,
    function: "setPeer",
    args: [
      settings.senderChainEid,
      padHex(settings.sender, { dir: "left", size: 32 }),
    ],
    ...settings,
  });
}
