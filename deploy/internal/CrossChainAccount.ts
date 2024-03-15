import { CCIPDeployments, Chains } from "../../utils/ccip";
import { Address, DeployInfo, Deployer } from "../../web3webdeploy/types";

export interface DeployCrossChainAccountSettings
  extends Omit<DeployInfo, "contract" | "args"> {
  originChainSelector: bigint;
  originAddress: Address;
}

export async function deployCrossChainAccount(
  deployer: Deployer,
  settings: DeployCrossChainAccountSettings
): Promise<Address> {
  const chainId = (settings.chainId ??
    deployer.settings.defaultChainId) as Chains;
  const ccipDeployment = CCIPDeployments[chainId];
  if (!ccipDeployment) {
    throw new Error(`Could not find CCIP deployment for chain ${chainId}`);
  }

  return await deployer
    .deploy({
      contract: "CrossChainAccount",
      args: [
        ccipDeployment.router,
        settings.originChainSelector,
        settings.originAddress,
      ],
      ...settings,
    })
    .then((deployment) => deployment.address);
}
