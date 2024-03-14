import { Address, DeployInfo, Deployer } from "../../web3webdeploy/types";

export interface DeployCrossChainGovernanceReceiverSettings
  extends Omit<DeployInfo, "contract" | "args"> {}

export async function deployCrossChainGovernanceReceiver(
  deployer: Deployer,
  settings: DeployCrossChainGovernanceReceiverSettings
): Promise<Address> {
  return await deployer
    .deploy({
      id: "CrossChainGovernanceReceiver",
      contract: "CrossChainGovernanceReceiver",
      args: [
        "0x6edce65403992e310a62460808c4b910d972f10f",
        deployer.settings.defaultFrom,
      ],
      ...settings,
    })
    .then((deployment) => deployment.address);
}
