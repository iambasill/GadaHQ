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


export const createTaskSchema = sanitizeObject(z.object({
    title : z.string().min(2).max(100),
    description : z.string().min(5).max(500),
    status: z.string(),
    priority: z.string(),
    dueDate: z.string(),
    createBy: z.string(),
    assignedTo: z.string()
}))
