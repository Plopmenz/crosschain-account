import { Address, DeployInfo, Deployer } from "../../web3webdeploy/types";

export interface DeployCrossChainGovernanceSenderSettings
  extends Omit<DeployInfo, "contract" | "args"> {}

export async function deployCrossChainGovernanceSender(
  deployer: Deployer,
  settings: DeployCrossChainGovernanceSenderSettings
): Promise<Address> {
  return await deployer
    .deploy({
      id: "CrossChainGovernanceSender",
      contract: "CrossChainGovernanceSender",
      args: ["0x1035CabC275068e0F4b745A29CEDf38E13aF41b1"],
      chainId: 80001,
      ...settings,
    })
    .then((deployment) => deployment.address);
}
