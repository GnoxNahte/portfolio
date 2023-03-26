// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
import { Tags } from "../others/tags";

const imagePathCheck = z.string().refine((val) => {
    // Check if the file path has a valid image extension
    const pattern = /\.(jpe?g|png|gif|bmp|tiff|webp)$/i;
    return pattern.test(val);
  }, {
    message: "Invalid image file path",
  });

// 2. Define a schema for each collection you'd like to validate.
const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    shortDescription: z.string(), 
    releaseDate: z.date(),
    projectLink: z.string().url().optional(),
    githubLink: z.string().url().optional(),
    thumbnailPath: imagePathCheck,
    // tags: z.nativeEnum(Tags).array(),
    tags: z.string()
            .array()
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