import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Role, FederatedPrincipal, OpenIdConnectProvider, ManagedPolicy, } from 'aws-cdk-lib/aws-iam';

export class GithubOidc extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const provider = new OpenIdConnectProvider(this, 'Provider', {
			clientIds: [
				'sts.amazonaws.com'
			],
			url: 'https://token.actions.githubusercontent.com',
		})

		new Role(this, 'Role', {
			assumedBy: new FederatedPrincipal(provider.openIdConnectProviderArn, {
				StringEquals: {
					'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com'
				},
				StringLike: {
					'token.actions.githubusercontent.com:sub': 'repo:kamosh-in/*'
				},
			}),
			managedPolicies: [
				ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
			],
			roleName: 'github-actions-role'
		})
	}
}
