export const blogContentType = {
  name: 'Blog Post',
  slug: 'blog-posts',
  description: 'Blog articles and content',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Post Title'
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      label: 'Post Excerpt'
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: 'Post Content (Markdown)'
    },
    {
      name: 'category',
      type: 'text',
      required: true,
      label: 'Category'
    },
    {
      name: 'imageUrl',
      type: 'text',
      required: true,
      label: 'Featured Image URL'
    },
    {
      name: 'author',
      type: 'object',
      required: true,
      label: 'Author',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Author Name'
        },
        {
          name: 'avatar',
          type: 'text',
          required: true,
          label: 'Author Avatar URL'
        }
      ]
    },
    {
      name: 'tags',
      type: 'array',
      required: true,
      label: 'Tags'
    }
  ]
};