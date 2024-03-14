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
      args: [
        "0x6edce65403992e310a62460808c4b910d972f10f",
        deployer.settings.defaultFrom,
      ],
      ...settings,
    })
    .then((deployment) => deployment.address);
}
