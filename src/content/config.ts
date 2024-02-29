// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
import { Tags } from "../others/tags";

// 2. Define a schema for each collection you'd like to validate.
const projects = defineCollection({
  schema: ({ image }) => z.object({
    title: z.string(),
    shortDescription: z.string(), 
    startDate: z.date(),
    releaseDate: z.date().optional(),
    projectLink: z.string().url().optional(),
    githubLink: z.string().url().optional(),
    // TODO(MEDIUM): Use astro's image() check. See astro 2.1 update https://astro.build/blog/astro-210/#built-in-image-support
    thumbnailPath: image(),
    // tags: z.nativeEnum(Tags).array(),
    tags: z.string()
            .array()
            .superRefine((tagsArray, ctx) => {
              let statusTagCount = 0;
              tagsArray.map((tag) => {
                const tagResult = Tags[tag as keyof typeof Tags];
                if (tagResult > Tags.Status && tagResult < (Tags.Status + 100))
                  statusTagCount++;
              })

              if (statusTagCount === 0)
              {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: "No status tag",
                })
              }
              else if (statusTagCount > 1)
              {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: "More than 1 status tag",
                })
              }
            })
            .transform((tagsArray, ctx) => {
              return tagsArray.map((tag) => {
                const tagResult = Tags[tag as keyof typeof Tags];

                if (tagResult === undefined) {
                  ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Not a valid Tag",
                  });

                  return z.NEVER;
                }

                return tagResult;
              })
            }),
    ifShow: z.boolean().default(true),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = { 
    projects 
};