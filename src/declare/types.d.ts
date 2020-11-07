export type MbInstallationInfo = {
  installationId: string;
  hubName: string;
  connectionString: string;
};

export type destructedAnswer = {
  uri: string;
  saName: string;
  saKey: string;
};

type NSsystem = "apns" | "gcm";

export type NSData = {
  NStoken: string;
  NSsystem: NSsystem;
};
