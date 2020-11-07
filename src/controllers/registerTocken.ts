import { log } from "console";
import {
  createSasToken,
  getMindboxInstallationInfo,
  sendCustomerToMindbox,
  sendDataToAzure,
  detectPlatform,
  distructMindboxAndswer,
} from "../helpers";

import { Sucess, Error } from "../models/CSV";

const registerTocken = async (tocken: string): Promise<Sucess> => {
  let tockenInfo;
  let installationInfo;
  let destructedAnswer;
  let sasTocke;

  try {
    tockenInfo = detectPlatform(tocken);
    const { data } = await getMindboxInstallationInfo(tockenInfo.NSsystem);
    installationInfo = data;
    destructedAnswer = distructMindboxAndswer(installationInfo);
    sasTocke = createSasToken(destructedAnswer);
    await sendDataToAzure(
      installationInfo,
      destructedAnswer,
      sasTocke,
      tockenInfo
    );
    await sendCustomerToMindbox(installationInfo, tockenInfo);

    return {
      installationId: installationInfo.installationId,
      tocken: tockenInfo.NStoken,
      platform: tockenInfo.NSsystem,
    };
  } catch (error) {
    console.log({
      tocken: tocken,
      error: error,
    });

    throw {
      tocken: tocken,
      error: error,
    };
  }
};

export default registerTocken;
