const baseUrl = 'http://local.reversim.com:5001';
// const baseUrl = '';

export default {
  name: 'Reversim Summit Backoffice',
  // errorMessageDataPath: ['error'],
  baseUrl,
  customStyles: {
    vars: {
      appBackground: '#f1f2f6',
      navBackground: '#5127ff',
      navItemHoverBackground: 'rgba(255,255,255,0.1)',
      navItemActiveBackground: '#f66103',
    }
  },
  pages: [
    {
      name: 'Users',
      id: 'users',
      methods: {
        getAll: {
          url: '/internal/users',
          queryParams: [
            {
              name: 'q',
              value: '',
              label: 'Name',
              type: 'text'
            }
          ],
          display: {
            type: 'cards',
          },
          fields: [
            {
              name: 'picture',
              type: 'image',
              label: 'Picture',
            },
            {
              name: '_id',
              type: 'text',
              label: 'ID',
            },
            {
              name: 'name',
              type: 'text',
              label: 'Name'
            },
            {
              name: 'oneLiner',
              type: 'text',
              label: 'One Liner'
            },
            {
              name: 'email',
              type: 'text',
              label: 'Email'
            },
            {
              name: 'isReversimTeamMember',
              type: 'boolean',
              label: 'Team Member'
            },
          ]
        },
        delete: {
          url: '/internal/users/:_id',
        }
      }
    },
    {
      name: 'Sponsors',
      id: 'sponsors',
      methods: {
        getAll: {
          url: '/internal/sponsors',
          queryParams: [
            {
              name: 'q',
              value: '',
              label: 'Name',
              type: 'text'
            }
          ],
          display: {
            type: 'cards',
          },
          fields: [
            {
              name: 'logo',
              type: 'image',
              label: 'logo',
            },
            {
              name: '_id',
              type: 'text',
              label: 'ID',
            },
            {
              name: 'name',
              type: 'text',
              label: 'Name'
            },
            {
              name: 'oneLiner',
              type: 'text',
              label: 'One Liner'
            },
            {
              name: 'url',
              type: 'url',
              label: 'Url',
            },
          ]
        },
        delete: {
          url: '/internal/sponsors/:_id',
        }
      }
    },
    {
      name: 'Proposals',
      id: 'proposals',
      methods: {
        getAll: {
          url: '/internal/proposals',
          queryParams: [
            {
              name: 'q',
              value: '',
              label: 'Title',
              type: 'text'
            }
          ],
          display: {
            type: 'table',
          },
          fields: [
            {
              name: '_id',
              type: 'text',
              label: 'ID',
            },
            {
              name: 'title',
              type: 'text',
              label: 'Title'
            },
            {
              name: 'status',
              type: 'text',
              label: 'Status'
            },
            {
              name: 'type',
              type: 'text',
              label: 'Type'
            },
            {
              name: 'legal',
              type: 'boolean',
              label: 'Legal',
            },
          ]
        },
        delete: {
          url: '/internal/proposals/:_id',
        }
      }
    },
    {
      name: 'Messages',
      id: 'messages',
      methods: {
        getAll: {
          url: '/internal/messages',
          queryParams: [
            {
              name: 'q',
              value: '',
              label: 'Text',
              type: 'text'
            }
          ],
          display: {
            type: 'table',
          },
          fields: [
            {
              name: '_id',
              type: 'text',
              label: 'ID',
            },
            {
              name: 'text',
              type: 'text',
              label: 'Text'
            }
          ]
        },
        delete: {
          url: '/internal/messages/:_id',
        }
      }
    },
  ]
}