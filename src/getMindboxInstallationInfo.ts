import axios, { AxiosResponse } from "axios";

type MbInstallationInfo = {
  installationId: string;
  hubName: string;
  connectionString: string;
};

const getMindboxInstallationInfo = async (
  endpoint: string
): Promise<AxiosResponse<MbInstallationInfo>> => {
  const installationInfo = await axios.post<MbInstallationInfo>(
    `https://api.mindbox.ru/v3/mobile-push/register?endpointId=${endpoint}`,
    {},
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  return installationInfo;
};

export default getMindboxInstallationInfo;
