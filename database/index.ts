import database from "./database.json";
const fs = require("fs");

export interface User {
  id: string;
  given_name: string;
  family_name: string;
  email: string;
  contacts?: Contact[];
  integrations?: {
    [key: string]: IntegrationData;
  };
}

export interface Contact {
  id: string;
  given_name: string;
  family_name: string;
  email: string;
  met_at_location: string;
  notes?: string;
}

export interface Integration {
  name: string;
  image_url: string;
  id: string;
  keys: string[];
}

export interface ZapierIntegrationData {
  api_key: string;
}

export interface SalesForceIntegrationData {
  client_id: string;
  client_secret: string;
}

export interface HubSpotIntegrationData {
  tenant_domain: string;
  client_id: string;
  client_secret: string;
  field_mappings: string;
}

export type IntegrationData =
  | ZapierIntegrationData
  | HubSpotIntegrationData
  | SalesForceIntegrationData;

export class Database {
  static updateDatabase() {
    let data = JSON.stringify(database);
    fs.writeFileSync("./database/database.json", data);
  }

  public static getUser(): User | undefined {
    const user = database.users[0] as User;
    return user;
  }

  public static getContacts(userId: string): Contact[] | undefined {
    const user = database.users.find((user) => user.id == userId) as User;
    const contacts = user?.contacts;
    return contacts;
  }

  public static getIntegrations(): Integration[] {
    const integrations = database.integrations as Integration[];
    return integrations;
  }

  public static setUserIntegrations(
    userId: string,
    integrationId: string,
    integrationData: IntegrationData
  ): void {
    // Check if the user and integration exists
    const user = database.users.find((user) => user.id == userId) as User;
    const integration = database.integrations.find(
      (integration) => integration.id == integrationId
    ) as Integration;
    if (!(user && integration)) return;

    // Adds the integration to the user object
    if (!user?.integrations) user.integrations = {};
    user.integrations[integrationId] = integrationData;
    this.updateDatabase();
  }
}
