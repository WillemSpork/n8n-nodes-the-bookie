import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class TheBookieOAuth2Api implements ICredentialType {
  name = 'theBookieOAuth2Api';
  displayName = 'The Bookie OAuth2';
  extends = ['oAuth2Api'];
  documentationUrl = 'https://thebookie.nl';

  properties: INodeProperties[] = [
    { displayName: 'Grant Type', name: 'grantType', type: 'hidden', default: 'authorizationCode' },
    { displayName: 'Authorization URL', name: 'authUrl', type: 'hidden', default: 'https://app.thebookie.nl/nl/o/authorize/?response_type=code', required: true },
    { displayName: 'Access Token URL', name: 'accessTokenUrl', type: 'hidden', default: 'https://app.thebookie.nl/nl/o/token/', required: true },
    { displayName: 'Scope', name: 'scope', type: 'hidden', default: 'read write' },
    { displayName: 'Token Type', name: 'tokenType', type: 'hidden', default: 'Bearer' },
    { displayName: 'Authentication', name: 'authentication', type: 'hidden', default: 'header' },
    { displayName: 'Client ID', name: 'clientId', type: 'string', default: '', required: true },
    { displayName: 'Client Secret', name: 'clientSecret', type: 'string', default: '', required: true, typeOptions: { password: true } },
    { displayName: 'Admin ID', name: 'adminId', type: 'string', default: '', description: 'Returned in redirect query; must be sent in every token call' },
    { displayName: 'Token Request Body', name: 'tokenRequestBody', type: 'hidden', default: 'admin_id={{$credentials.adminId}}' },
  ];
}
