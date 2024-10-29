export type ActionResult<Data = undefined> =
  | (Data extends undefined
      ? { success: true; message: string }
      : { success: true; message: string; data: Data })
  | { success: false; error: string; formErrors?: Record<string, string> };
