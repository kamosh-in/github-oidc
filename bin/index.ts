import { App } from 'aws-cdk-lib';
import { GithubOidc } from '../lib';

const app = new App();

new GithubOidc(app, 'GithubOidc', {
  env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION,
	},
});