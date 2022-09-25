## Getting Started

Setup by running `yarn` && `yarn dev`

## Challenge

The challenge is presented below as a feature that's required for the Blinq application. The repository surrounding this is setup with a mock database, user interface and APIs — you do not need to modify these or create actual database connections.

### Blinq Integrations

Blinq wants to allow third-party services to integrate with certain parts of the product. Each integration is different & will come with its own integration options. As part of a pilot program Blinq is working with 3 integration partners, Salesforce, HubSpot & Zapier. These partners would like to integrate with the Contact book component of Blinq.

When an integration is configured, Blinq will submit the details of the contact to the partner's API.

This repository houses the Integration Settings experience. This experience needs to be extended to display the available partners & provide a user experience to connect new integrations to the user's account.

An ideal solution should:

- Show available integrations
- Be extensible so more integration partners can be added
- Support the fields listed by our pilot partners

The pilot partners Blinq is working with have specified which fields would be required to connect to their APIs.

- Salesforce — `client_id` and `client_secret`
- Zapier — `api_key`
- HubSpot — `tenant_domain`, `client_id`, `client_secret` and `field_mappings`
  - HubSpot specifically requires Blinq to specify which fields the contact details should be mapped to. These may be like `first_name`, `last_name` or `hs_custom_field1234`.
