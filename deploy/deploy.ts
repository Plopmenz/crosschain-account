import { Deployer } from "../web3webdeploy/types";

export interface CrossChainGovernanceDeploymentSettings {}

export interface CrossChainGovernanceDeployment {}

export async function deploy(
  deployer: Deployer,
  settings?: CrossChainGovernanceDeploymentSettings
): Promise<CrossChainGovernanceDeployment> {
  return {};
}
