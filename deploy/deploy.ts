import { Address, Deployer } from "../web3webdeploy/types";
import {
  DeployCrossChainGovernanceReceiverSettings,
  deployCrossChainGovernanceReceiver,
} from "./internal/CrossChainGovernanceReceiver";
import {
  DeployCrossChainGovernanceSenderSettings,
  deployCrossChainGovernanceSender,
} from "./internal/CrossChainGovernanceSender";
import {
  SetReceiverPeerSettings,
  setReceiverPeer,
} from "./internal/SetReceiverPeer";
import { SetSenderPeerSettings, setSenderPeer } from "./internal/SetSenderPeer";

export interface CrossChainGovernanceDeploymentSettings {
  deployReceiverSettings: DeployCrossChainGovernanceReceiverSettings;
  deploySenderSettings: DeployCrossChainGovernanceSenderSettings;
  setReceiverPeerSettings: Omit<
    SetReceiverPeerSettings,
    "receiver" | "sender" | "senderChainEid"
  >;
  setSenderPeerSettings: Omit<
    SetSenderPeerSettings,
    "sender" | "receiver" | "receiverChainEid"
  >;
  forceRedeploy?: boolean;
}

export interface CrossChainGovernanceDeployment {
  receiver: Address;
  sender: Address;
}

export async function deploy(
  deployer: Deployer,
  settings?: CrossChainGovernanceDeploymentSettings
): Promise<CrossChainGovernanceDeployment> {
  if (settings?.forceRedeploy !== undefined && !settings.forceRedeploy) {
    return await deployer.loadDeployment({ deploymentName: "latest.json" });
  }

  const receiver = await deployCrossChainGovernanceReceiver(deployer, {
    chainId: 11155111,
    ...(settings?.deployReceiverSettings ?? {}),
  });
  const sender = await deployCrossChainGovernanceSender(deployer, {
    chainId: 80001,
    ...(settings?.deploySenderSettings ?? {}),
  });
  await setReceiverPeer(deployer, {
    chainId: 11155111,
    reveiver: receiver,
    sender: sender,
    senderChainEid: BigInt(40109),
    ...(settings?.setReceiverPeerSettings ?? {}),
  });
  await setSenderPeer(deployer, {
    chainId: 80001,
    sender: sender,
    reveiver: receiver,
    reveiverChainEid: BigInt(40161),
    ...(settings?.setReceiverPeerSettings ?? {}),
  });

  const deployment = {
    receiver: receiver,
    sender: sender,
  };
  await deployer.saveDeployment({
    deploymentName: "latest.json",
    deployment: deployment,
  });
  return deployment;
}
