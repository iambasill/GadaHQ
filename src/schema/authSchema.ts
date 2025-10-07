import * as z from "zod";
import sanitizeHtml from "sanitize-html";



const sanitizeObject = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => {
  return z.object(
    Object.fromEntries(
      Object.entries(schema.shape).map(([key, value]) => {
        if (value instanceof z.ZodString) {
          return [
            key,
            value.transform((val) =>
              sanitizeHtml(val, {
                allowedTags: [],
                parser: {
                  decodeEntities: true,
                },
              })
            ),
          ];
        }
        return [key, value];
      })
    ) as T
  );
};


export const signUpSchema = sanitizeObject(z.object({
    firstName: z.string().min(2).max(30),
    lastName: z.string().min(2).max(30),
    email:z.string().min(5).max(50),
    role: z.string(),
    password: z.string().min(6).max(20)
}))

export const loginSchema= sanitizeObject(z.object({
    email:z.string(),
    password: z.string()
}))

export const userIdSchema= sanitizeObject(z.object({
    userId:z.string()
}))

export const tokenSchema= sanitizeObject(z.object({
    refreshToken:z.string()
}))
