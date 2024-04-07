import jwt from "jsonwebtoken";

export default async function verifyToken(
  token: string,
  admin: boolean = false
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decode: any) => {
        if (decode) {
          if (admin) {
            if (decode.role !== "admin") {
              reject("access denied");
            } else {
              resolve(true);
            }
          }
          resolve(true);
        } else {
          reject(err);
        }
      }
    );
  });
}
