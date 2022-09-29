import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact, Integration, IntegrationData, User } from "../../database";
const blinqApiLink =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/api/"
    : "TODO: Add PROD ENVIRONMENT";

type integrationQueryParams = {
  userId: string;
  integrationId: string;
  integrationData: IntegrationData;
};

type contactIntegrationParams = {
  contact: Contact;
  integrationData: IntegrationData;
};

export const blinkApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: blinqApiLink,
  }),
  tagTypes: ["UserIntegrations"],
  reducerPath: "blinq",
  endpoints: (build) => ({
    getIntegrations: build.query<Integration[], void>({
      query: () => {
        return {
          url: `getIntegrations`,
          method: "GET",
        };
      },
    }),
    getUser: build.query<User, void>({
      query: () => {
        return {
          url: `getUser`,
          method: "GET",
        };
      },
      providesTags: ["UserIntegrations"],
    }),
    setUserIntegration: build.mutation<boolean, integrationQueryParams>({
      query: ({
        userId,
        integrationId,
        integrationData,
      }: integrationQueryParams) => {
        return {
          url: `setUserIntegration`,
          method: "POST",
          body: { userId, integrationId, integrationData },
        };
      },
      invalidatesTags: ["UserIntegrations"],
    }),
    linkContactIntegration: build.mutation<boolean, contactIntegrationParams>({
      query: ({ contact, integrationData }: contactIntegrationParams) => {
        return {
          url: `linkContactIntegration`,
          method: "POST",
          body: { contact, integrationData },
        };
      },
    }),
  }),
});

export const {
  useGetIntegrationsQuery,
  useGetUserQuery,
  useSetUserIntegrationMutation,
  useLinkContactIntegrationMutation,
} = blinkApi;
