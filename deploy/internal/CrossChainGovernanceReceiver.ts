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
      args: ["0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59"],
      chainId: 11155111,
      ...settings,
    })
    .then((deployment) => deployment.address);
}
