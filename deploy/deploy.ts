import { Address, Deployer } from "../web3webdeploy/types";
import {
  DeployCrossChainGovernanceReceiverSettings,
  deployCrossChainGovernanceReceiver,
} from "./internal/CrossChainGovernanceReceiver";
import {
  DeployCrossChainGovernanceSenderSettings,
  deployCrossChainGovernanceSender,
} from "./internal/CrossChainGovernanceSender";

export interface CrossChainGovernanceDeploymentSettings {
  deployReceiverSettings: DeployCrossChainGovernanceReceiverSettings;
  deploySenderSettings: DeployCrossChainGovernanceSenderSettings;
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
    ...(settings?.deployReceiverSettings ?? {}),
  });
  const sender = await deployCrossChainGovernanceSender(deployer, {
    ...(settings?.deploySenderSettings ?? {}),
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
