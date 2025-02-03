export const aiNicheContentType = {
  name: 'AI Niche Service',
  slug: 'ai-niche-services',
  description: 'Industry-specific AI service offerings',
  fields: [
    {
      name: 'industry',
      type: 'text',
      required: true,
      label: 'Industry Name'
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
      label: 'Industry Icon (from Lucide)'
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Industry Description'
    },
    {
      name: 'topics',
      type: 'array',
      required: true,
      label: 'Industry Topics',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Topic Title'
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          label: 'Topic Description'
        }
      ]
    },
    {
      name: 'offerings',
      type: 'array',
      required: true,
      label: 'Service Offerings',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Offering Title'
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Offering Description'
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: 'Starting Price'
        },
        {
          name: 'expert',
          type: 'object',
          required: true,
          label: 'Service Expert',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Expert Name'
            },
            {
              name: 'level',
              type: 'text',
              required: true,
              label: 'Expert Level'
            },
            {
              name: 'avatar',
              type: 'text',
              required: true,
              label: 'Expert Avatar URL'
            }
          ]
        },
        {
          name: 'technologies',
          type: 'array',
          required: true,
          label: 'Technologies Used'
        },
        {
          name: 'thumbnailUrl',
          type: 'text',
          required: true,
          label: 'Offering Thumbnail URL'
        }
      ]
    }
  ]
};