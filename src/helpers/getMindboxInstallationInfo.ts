import axios, { AxiosError, AxiosResponse } from "axios";
import { MbInstallationInfo } from "../declare/types.d";

const getMindboxInstallationInfo = async (
  platfom: string
): Promise<AxiosResponse<MbInstallationInfo>> => {
  try {
    const installationInfo = await axios.post<MbInstallationInfo>(
      `https://api.mindbox.ru/v3/mobile-push/register?endpointId=${process.env[platfom]}`,
      null,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    return installationInfo;
  } catch (error) {
    throw error;
  }
};

export default getMindboxInstallationInfo;
