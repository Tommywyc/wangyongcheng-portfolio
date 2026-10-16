export const email = "w3194510963@gmail.com";
export const emailSubject = "Undergraduate Research / Project Collaboration — Tommy Wang";

export async function tryCopyText(text: string, clipboard?: Pick<Clipboard, "writeText">): Promise<boolean> {
  try {
    if (!clipboard) return false;
    await clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
