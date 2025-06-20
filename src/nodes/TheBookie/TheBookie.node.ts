import { INodeType, INodeTypeDescription } from 'n8n-workflow';

export class TheBookie implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'The Bookie',
    name: 'theBookie',
    icon: 'file:bookie.svg',
    group: ['transform'],
    version: 1,
    description: 'Interact with The Bookie API',
    defaults: {
      name: 'The Bookie',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'theBookieOAuth2Api',
        required: true,
      },
    ],
    requestDefaults: {
      baseURL: 'https://app.thebookie.nl',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        options: [
          {
            name: 'Purchase Journal',
            value: 'purchaseJournal',
          },
          {
            name: 'Contacts',
            value: 'contact',
          },
        ],
        default: 'purchaseJournal',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
          show: {
            resource: ['purchaseJournal'],
          },
        },
        options: [
          {
            name: 'Create',
            value: 'create',
            routing: {
              request: {
                method: 'POST',
                url: '/nl/api/e1/purchase-journals/create/',
                body: {
                  admin_id: '={{ $credentials.adminId }}',
                  contact_id: '={{ $parameter.contactId }}',
                  payment_ref: 0,
                  invoice_date: '={{ new Date().toISOString().slice(0,10) }}',
                  btw_shifted: 'NONE',
                  journal_entry_lines: [
                    {
                      description: '={{ $parameter.description || "Auto via n8n" }}',
                      btw_type: 'PROCENT_21',
                      amount: '={{ $parameter.amount }}',
                      amount_btw: 0,
                      master_ledger_account: 4140,
                    },
                  ],
                },
              },
            },
          },
        ],
        default: 'create',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        displayOptions: {
          show: {
            resource: ['contact'],
          },
        },
        options: [
          {
            name: 'List',
            value: 'list',
            routing: {
              request: {
                method: 'GET',
                url: '/nl/api/e1/contacts/',
                qs: {
                  admin_id: '={{ $credentials.adminId }}',
                },
              },
            },
          },
        ],
        default: 'list',
      },
      {
        displayName: 'Amount',
        name: 'amount',
        type: 'number',
        default: 0,
        required: true,
        displayOptions: {
          show: {
            resource: ['purchaseJournal'],
            operation: ['create'],
          },
        },
      },
      {
        displayName: 'Contact ID',
        name: 'contactId',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
          show: {
            resource: ['purchaseJournal'],
            operation: ['create'],
          },
        },
      },
      {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: 'Auto via n8n',
        displayOptions: {
          show: {
            resource: ['purchaseJournal'],
            operation: ['create'],
          },
        },
      },
    ],
  };
}
