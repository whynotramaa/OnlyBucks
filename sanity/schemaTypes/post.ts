import { FileTextIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Posts",
  type: "document",
  icon: FileTextIcon,
  description: "Content posts that can be restricted by tier access level",
  preview: {
    select: {
      title: "title",
      tierAccess: "tierAccess",
      media: "coverImage",
    },
    prepare({ title, tierAccess, media }) {
      return {
        title,
        subtitle: `Access: ${tierAccess || "None"}`,
        media,
      };
    },
  },
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "The main title of your post",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      description: "The main content of your post with rich text formatting options",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tierAccess",
      title: "Tier Access",
      type: "string",
      description: "Select which membership tiers can access this post",
      options: {
        list: [
          { title: "Nomrie Pass", value: "Normies" },
          { title: "Insider Pass", value: "Insiders" },
          { title: "Homies Access", value: "Homies" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "The main image displayed for this post",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          description: "Alternative text for accessibility and SEO",
        },
      ],
    }),
     defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      description: "Additional images for your post",
      of: [
        {
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              description: "Alternative text for accessibility and SEO",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Optional caption for this image",
            }
          ]
        }
      ],
    }),
  ],
});