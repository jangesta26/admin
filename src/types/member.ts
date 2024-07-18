import * as z from 'zod';

const onlyAlphabetic = (value: string) => {
    const regex = /^[A-Za-zñÑ\s]*$/;
    return regex.test(value);
  };
export const AddMemberSchema = z.object({
    fname: z
    .string()
    .min(1, { message: "First Name is required" })
    .refine(value => onlyAlphabetic(value), { message: "First Name must contain only alphabetic characters and spaces" }),
    lname: z
    .string()
    .min(1, { message: "Last Name is required" })
    .refine(value => onlyAlphabetic(value), { message: "Last Name must contain only alphabetic characters and spaces" }),
    gender: z.string(),
    dob: z.date().refine((dob) => {
        if (!dob) return false; // Ensure dob is provided
        const currentDate = new Date();
        const minDate = new Date();
        minDate.setFullYear(currentDate.getFullYear() - 18); // Calculate date 18 years ago
        return dob <= currentDate && dob <= minDate;
    }, { message: "Age must be at least 18 years ago" }),
    email: z.string().email({ message: "Invalid email address" }),
    username: z.string().min(6, { message: "Username must be at least 6 characters long" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

const addMemberSchema = AddMemberSchema.brand<'AddMemberAccount'>()

export type AddMemberAccount = z.infer<typeof addMemberSchema>;


export const getMemberSchema = z.object({
  id:z.number(),
  fname: z.string(),
  lname: z.string(),
  gender: z.string(),
  dob: z.string(),
  email: z.string(),
  username: z.string(),
  password: z.string(),
  status: z.number(),
  createdAt: z.string(),
});

const getMember= getMemberSchema.brand<'GetMember'>()


export type GetMember = z.infer<typeof getMember>;

export const getMetaSchema = z.object({
  itemsPerPage:z.number(),
  totalItems: z.number(),
  currentPage: z.number(),
  totalPages: z.number(),
  sortBy: z.array(z.array(z.string())),
});

const getMeta= getMetaSchema.brand<'GetMeta'>()

export type GetMeta = z.infer<typeof getMeta>;


export const GetApiResponseSchema  = z.object({
  data: z.array(getMemberSchema),
  meta: getMetaSchema,
});

const getApiResponseSchema = GetApiResponseSchema.brand<'GetApiResponse'>()

export type GetApiResponse = z.infer<typeof getApiResponseSchema>;





