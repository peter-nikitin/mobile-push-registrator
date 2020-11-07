import { MbInstallationInfo, destructedAnswer } from "../declare/types.d";

const distructMindboxAndswer = (
  answer: MbInstallationInfo
): destructedAnswer => {
  const { connectionString, hubName, installationId } = answer;

  // Endpoint=sb://mindboxmobilepushnotifications-3.servicebus.windows.net/;SharedAccessKeyName=DefaultListenSharedAccessSignature;SharedAccessKey=ZUNtHWxkPdjs6g592roXj5QgOdh8IOfXk2NWjnKWISY=

  const splitterConnetionString = connectionString.split(";");

  const namespace = splitterConnetionString[0].split("//")[1].split(".")[0];
  const sharedAccessKeyName = splitterConnetionString[1].replace(
    "SharedAccessKeyName=",
    ""
  );
  const SharedAccessKey = splitterConnetionString[2].replace(
    "SharedAccessKey=",
    ""
  );

  const azureAdress = `https://${namespace}.servicebus.windows.net/${hubName}/installations/${installationId}?api-version=2015-01`;

  return {
    uri: azureAdress,
    saKey: SharedAccessKey,
    saName: sharedAccessKeyName,
  };
};

export default distructMindboxAndswer;
