const baseUrl = 'http://local.reversim.com:5001';
// const baseUrl = '';

const userFields = [
  { 
    name: 'name',
    type: 'text',
    label: 'Name',
    required: true,
  },
  { 
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
  },
  { 
    name: 'oneLiner',
    type: 'text',
    label: 'One Liner',
  },
  { 
    name: 'bio',
    type: 'long-text',
    label: 'Bio',
  },
  { 
    name: 'picture',
    type: 'text',
    label: 'Picture',
  },
  { 
    name: 'isReversimTeamMember',
    type: 'boolean',
    label: 'Team Member',
  },
  { 
    name: 'isDataAdmin',
    type: 'boolean',
    label: 'Data Admin',
  },
  { 
    name: 'gender',
    type: 'select',
    label: 'Gender',
    options: ['male', 'female']
  },
  { 
    name: 'phone',
    type: 'text',
    label: 'Phone',
  },
  { 
    name: 'location',
    type: 'text',
    label: 'Location',
  },
  { 
    name: 'website',
    type: 'text',
    label: 'Website',
  },
  { 
    name: 'linkedin',
    type: 'text',
    label: 'LinkedIn',
  },
  { 
    name: 'github',
    type: 'text',
    label: 'Github',
  },
  { 
    name: 'twitter',
    type: 'text',
    label: 'Twitter',
  },
  { 
    name: 'stackOverflow',
    type: 'text',
    label: 'StackOverflow',
  },
  { 
    name: 'google',
    type: 'text',
    label: 'Google',
  },
  { 
    name: 'video_url',
    type: 'text',
    label: 'Video URL',
  },
];

const proposalFields = [
  {
    name: 'title',
    type: 'text',
    label: 'Title'
  },
  {
    name: 'status',
    type: 'select',
    label: 'Status',
    options: ['proposed', 'accepted', 'rejected']
  },
  {
    name: 'abstract',
    type: 'long-text',
    label: 'Abstract'
  },
  {
    name: 'outline',
    type: 'long-text',
    label: 'Outline'
  },
  {
    name: 'type',
    type: 'select',
    label: 'Type',
    options: ['full', 'lightning', 'ossil', 'postmortem']
  },
  {
    name: 'hall',
    type: 'text',
    label: 'hall'
  },
  {
    name: 'startTime',
    type: 'date',
    label: 'Start Time'
  },
  {
    name: 'endTime',
    type: 'date',
    label: 'End Time'
  },
  {
    name: 'speaker_ids',
    type: 'array',
    label: 'Speaker IDs'
  },
  {
    name: 'attendees',
    type: 'array',
    label: 'Attendees IDs'
  },
  {
    name: 'notAttendees',
    type: 'array',
    label: 'Not Attendees IDs'
  },
  {
    name: 'comments',
    type: 'array',
    label: 'Comments'
  },
  {
    name: 'tags',
    type: 'array',
    label: 'Tags'
  },
  {
    name: 'categories',
    type: 'array',
    label: 'Categories'
  },
  {
    name: 'slides_gdrive_id',
    type: 'text',
    label: 'GDrive ID'
  },
  {
    name: 'editing',
    type: 'boolean',
    label: 'Editing'
  },
  {
    name: 'deleted',
    type: 'boolean',
    label: 'Deleted'
  },
  {
    name: 'legal',
    type: 'boolean',
    label: 'Legal'
  },
];

const sponsorFields = [
  {
    name: 'name',
    type: 'text',
    label: 'Name',
    required: true
  },
  {
    name: 'logo',
    type: 'text',
    label: 'Logo',
    required: true
  },
  {

    name: 'link',
    dataPath: 'location',
    type: 'text',
    label: 'Location Link',
  },
  {
    name: 'shortAddress',
    dataPath: 'location',
    type: 'text',
    label: 'Location Address',
  },
  {
    name: 'socials',
    type: 'object',
    label: 'Socials',
  },
  {
    name: 'oneLiner',
    type: 'text',
    label: 'One Liner',
  },
  {
    name: 'about',
    type: 'long-text',
    label: 'about',
  },
  {
    name: 'text',
    dataPath: 'techStory',
    type: 'text',
    label: 'Tech Story',
  },
  {
    name: 'technologies',
    dataPath: 'techStory',
    type: 'array',
    label: 'Technologies',
  },
  {
    name: 'openPositions',
    type: 'object',
    label: 'Open Positions',
  },
  {
    name: 'url',
    type: 'text',
    label: 'Url',
  },
  {
    name: 'jobUrl',
    type: 'text',
    label: 'Job Url',
  },
  {
    name: 'images',
    type: 'array',
    label: 'Images',
  },
  {
    name: 'reversimAndUs',
    type: 'long-text',
    label: 'Reversim & Us',
  },
  {
    name: 'isPremium',
    type: 'boolean',
    label: 'Premium',
  },
];

const messageFields = [
  {
    name: 'text',
    type: 'long-text',
    label: 'Text',
    required: true,
  }
];

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
        post: {
          url: '/internal/users',
          fields: userFields
        },
        put: {
          url: '/internal/users/:_id',
          fields: userFields
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
        post: {
          url: '/internal/sponsors',
          fields: sponsorFields
        },
        put: {
          url: '/internal/sponsors/:_id',
          fields: sponsorFields
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
        post: {
          url: '/internal/proposals',
          fields: proposalFields
        },
        put: {
          url: '/internal/proposals/:_id',
          fields: proposalFields
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
        post: {
          url: '/internal/messages',
          fields: messageFields
        },
        put: {
          url: '/internal/messages/:_id',
          fields: messageFields
        },
        delete: {
          url: '/internal/messages/:_id',
        }
      }
    },
  ]
}