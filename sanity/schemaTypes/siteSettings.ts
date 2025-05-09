// siteSettings.ts
import { defineField, defineType, defineArrayMember } from 'sanity'
import { Settings } from 'lucide-react'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  description:'GLobal settings and configuration for your creator page',
  icon: Settings,
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      description: 'The name of your website that appears in the browser tab and search results',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      description: 'A brief summary of your site for search engines and social shares',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'headerLogo',
      title: 'Header Logo',
      description: 'The logo that appears in the navigation header of your site',
      type: 'image',
      
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Description of the image for screen readers and SEO',
        }),
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'mainHeroImage',
      title: 'Main Hero Image',
      description: 'The large featured image that appears on your homepage',
      type: 'image',
      
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Description of the image for screen readers and SEO',
        }),
      ],
      validation: Rule => Rule.required()

    }),
    defineField({
      name: 'logo',
      title: 'Brand Logo',
      description: 'Your primary brand logo used throughout the site',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Description of the image for screen readers and SEO',
        }),
      ],
    }),
    defineField({
      name: 'socialMediaLinks',
      title: 'Social Media Links',
      description: 'Links to your social media profiles that will appear in the footer',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name:"socialLink",
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              description: 'Select which social media platform this link is for',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'GitHub', value: 'github' },
                ],
              },
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              description: 'The full URL to your profile on this platform',
              type: 'url',
              validation: Rule => Rule.required().uri({
                scheme: ['http', 'https'],
              }),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              description: 'Optional icon name if you have an icon system in place',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'platform',
              subtitle: 'url',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'callToActionText',
      title: 'Call To Action Text',
      description: 'The text displayed on your primary action button',
      type: 'string',
    }),
    defineField({
      name: 'pricingDetails',
      title: 'Pricing Details',
      description: 'Set up different pricing plans for your products or services',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'planName',
              title: 'Plan Name',
              description: 'The name of this pricing tier (e.g. Basic, Pro, Enterprise)',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'price',
              title: 'Price',
              description: 'The numerical price value (without currency symbol)',
              type: 'number',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'currency',
              title: 'Currency',
              description: 'The currency code for this price (e.g. USD, EUR)',
              type: 'string',
              initialValue: 'USD',
            }),
            defineField({
              name: 'billingPeriod',
              title: 'Billing Period',
              description: 'How often customers are billed for this plan',
              type: 'string',
              options: {
                list: [
                  { title: 'Monthly', value: 'monthly' },
                  { title: 'Annually', value: 'annually' },
                  { title: 'One-time', value: 'onetime' },
                ],
              },
              initialValue: 'monthly',
            }),
            defineField({
              name: 'features',
              title: 'Features',
              description: 'List of features included in this pricing plan',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
            defineField({
              name: 'isPopular',
              title: 'Popular Plan',
              description: 'Toggle on to highlight this as your most popular plan',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: 'planName',
              subtitle: 'price',
            },
            prepare({ title, subtitle }) {
              return {
                title,
                subtitle: `$${subtitle}`,
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Manage Your Site Settings',
      }
    },
  },
})