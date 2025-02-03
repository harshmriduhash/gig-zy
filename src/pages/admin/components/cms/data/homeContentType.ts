export const homeContentType = {
  name: 'Home Page',
  slug: 'home',
  description: 'Home page content and sections',
  fields: [
    {
      name: 'hero',
      type: 'object',
      required: true,
      label: 'Hero Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Hero Title'
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          label: 'Hero Subtitle'
        },
        {
          name: 'imageUrl',
          type: 'text',
          required: true,
          label: 'Hero Image URL'
        }
      ]
    },
    {
      name: 'stats',
      type: 'array',
      required: true,
      label: 'Statistics',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Stat Label'
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Stat Value'
        }
      ]
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      label: 'Features',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Feature Title'
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          label: 'Feature Description'
        },
        {
          name: 'icon',
          type: 'text',
          required: true,
          label: 'Feature Icon (from Lucide)'
        }
      ]
    }
  ]
};