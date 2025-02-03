import { Type, Image, Video, Music } from 'lucide-react';

export const genAiServices = {
  id: 'gen-ai',
  name: 'Generative AI Services',
  icon: Type,
  description: 'Create unique content across multiple mediums using AI',
  subcategories: [
    {
      id: 'text-generation',
      name: 'Text Generation',
      services: [
        { id: 'blog-articles', name: 'Blog Posts, Articles, Emails', path: '/services/gen-ai/blog-articles' },
        { id: 'social-media', name: 'Social Media Posts & Ad Copies', path: '/services/gen-ai/social-media' },
        { id: 'creative-writing', name: 'Creative Writing (Stories, Poems)', path: '/services/gen-ai/creative-writing' }
      ]
    },
    {
      id: 'image-generation',
      name: 'Image Generation',
      services: [
        { id: 'ai-art', name: 'AI-Generated Art', path: '/services/gen-ai/ai-art' },
        { id: 'logo-creation', name: 'Custom Logo Creation', path: '/services/gen-ai/logo-creation' },
        { id: 'product-mockups', name: 'Product Mockups', path: '/services/gen-ai/product-mockups' }
      ]
    },
    {
      id: 'video-generation',
      name: 'Video & Animation Generation',
      services: [
        { id: 'video-editing', name: 'AI-Powered Video Editing', path: '/services/gen-ai/video-editing' },
        { id: 'ai-animations', name: 'AI-Generated Animations', path: '/services/gen-ai/animations' },
        { id: 'deepfake', name: 'Deepfake Creation (for ethical purposes)', path: '/services/gen-ai/deepfake' }
      ]
    },
    {
      id: 'audio-generation',
      name: 'Audio & Music Generation',
      services: [
        { id: 'ai-music', name: 'AI-Composed Music', path: '/services/gen-ai/ai-music' },
        { id: 'sound-effects', name: 'AI-Generated Sound Effects', path: '/services/gen-ai/sound-effects' },
        { id: 'voice-cloning', name: 'Voice Cloning', path: '/services/gen-ai/voice-cloning' }
      ]
    }
  ]
};