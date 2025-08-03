import { api } from "@/services/axios/axios";
import { Session } from "../interface/sessionInterface";

export const fncDeleteImage = async (fileName: string, session: Session) => {
  try {
    console.log(fileName);
    const res: any = await api.delete(
      `/api/admin/menu/image?fileName=${fileName}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      }
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};
