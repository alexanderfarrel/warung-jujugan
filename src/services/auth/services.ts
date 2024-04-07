import { addData, retrieveDataByField } from "@/libs/firebase/service";
import bcrypt from "bcrypt";

export async function register(data: {
  email: string;
  username: string;
  password: string;
  role?: string;
  created_at?: Date;
  updated_at?: Date;
}) {
  const user = await retrieveDataByField("users", "email", data.email);
  if (user.length > 0) {
    return { status: false, statusCode: 400, message: "User already exists" };
  } else {
    data.role = "member";
    data.password = await bcrypt.hash(data.password, 10);
    data.created_at = new Date();
    data.updated_at = new Date();
    try {
      const result: any = await addData("users", data);
      if (result.status) {
        return { status: true, statusCode: 200, message: "Register Success" };
      } else {
        return { status: false, statusCode: 400, message: "Register Failed" };
      }
    } catch (err) {
      return { status: false, statusCode: 400, message: "Register Failed" };
    }
  }
}

export async function login(data: { email: string }) {
  const user = await retrieveDataByField("users", "email", data.email);
  if (user.length > 0) {
    return user[0];
  } else {
    return { status: false, statusCode: 400, message: "User not found" };
  }
}

export async function loginWithGoogle(data: any, callback: Function) {
  const user: any = await retrieveDataByField("users", "email", data.email);
  if (user.length > 0) {
    data.role = user[0].role;
    data.username = user[0].username;
    data.id = user[0].id;
    callback({ status: true, statusCode: 200, user: data });
  } else {
    data.role = "member";
    const result: any = await addData("users", data);
    if (result.status) {
      callback({ status: true, statusCode: 200, user: data });
    } else {
      callback({ status: false, statusCode: 400, user: data });
    }
  }
}
