export const serviceContentType = {
  name: 'Service',
  slug: 'services',
  description: 'AI and development service offerings',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Service Title'
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Service Description'
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
      label: 'Icon Name (from Lucide)'
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
          name: 'technologies',
          type: 'array',
          required: true,
          label: 'Technologies Used'
        },
        {
          name: 'thumbnailUrl',
          type: 'text',
          required: true,
          label: 'Thumbnail Image URL'
        },
        {
          name: 'featured',
          type: 'boolean',
          required: false,
          label: 'Featured Offering'
        }
      ]
    },
    {
      name: 'filters',
      type: 'array',
      required: true,
      label: 'Service Filters',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Filter Name'
        },
        {
          name: 'options',
          type: 'array',
          required: true,
          label: 'Filter Options'
        }
      ]
    }
  ]
};