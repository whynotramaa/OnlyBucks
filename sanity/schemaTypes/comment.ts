import { MessageCircle } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "comment",
  title: "Comments",
  type: "document",
  icon: MessageCircle,
  fields: [
    defineField({
      name: "post",
      title: "Post",
      type: "reference",
      to: [{ type: "post" }],
      description: "The post this comment belongs to",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of the commenter",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Email of the commenter",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "userImage",
      title: "User Image",
      type: "url",
      description: "URL to the commenter's profile image",
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "text",
      description: "The content of the comment",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "approved",
      title: "Approved",
      type: "boolean",
      description: "Comments won't show on the site without approval",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      description: "When the comment was submitted",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "comment",
      media: "userImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle.length > 50 ? subtitle.substring(0, 50) + "..." : subtitle,
        media: media ? media : MessageCircle,
      };
    },
  },
});