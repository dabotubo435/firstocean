import slugify from "@sindresorhus/slugify";
import { customAlphabet } from "nanoid";

export function uploadFilename(name: string, file: File) {
  const nanoid = customAlphabet("0123456789");
  const ext = file.name.split(".").pop();
  return slugify(name) + "-" + nanoid(6) + "." + ext;
}

export function uploadFullUrl(fullPath: string) {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${fullPath}`;
}
