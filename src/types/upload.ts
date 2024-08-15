import * as z from 'zod';

// images validation
export const getImageUrlSchema = z.object({
  imageUrl: z.string(),

});

const getImageUrl= getImageUrlSchema.brand<'GetImageUrl'>()

export type GetImage = z.infer<typeof getImageUrl>;






