import { useEffect, useState } from "react";
import { Contact, Integration, IntegrationData, User } from "../../database";
import {
  useLinkContactIntegrationMutation,
  useUserIntegrationsQuery,
  useUserQuery,
} from "../../redux/apis/blinq";
import styles from "../../styles/contacts.module.scss";

type ContactProps = {
  contact: Contact;
  userData: User;
  integrations: Integration[];
};

const Contact = ({ contact, userData, integrations }: ContactProps) => {
  const userIntegrations = userData?.integrations;
  const [addIntegrationTrigger, { isLoading }] =
    useLinkContactIntegrationMutation();
  const addIntegrationCallback = (
    contact: Contact,
    integrationData: IntegrationData
  ) => {
    addIntegrationTrigger({ contact, integrationData });
  };

  return (
    <div>
      <div className={styles.container}>
        <div className='name'>
          <b>First Name: </b>
          {contact.family_name}
        </div>
        <div className='name'>
          <b>Last Name: </b>
          {contact.given_name}
        </div>
        <div>
          {" "}
          <b>Email: </b>
          {contact.email}
        </div>
        <div>
          {" "}
          <b>Met at: </b>
          {contact.met_at_location}
        </div>
        {contact.notes && (
          <div>
            {" "}
            <b>Notes: </b>
            {contact.notes}
          </div>
        )}

        {userIntegrations && (
          <div className={styles.integrations}>
            {Object.keys(userIntegrations).map((key) => {
              const foundIntegration = integrations.find((i) => i.id == key);
              return (
                <div>
                  Add to:
                  <img
                    onClick={() =>
                      addIntegrationCallback(contact, userIntegrations[key])
                    }
                    src={foundIntegration?.image_url}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default function ContactsList() {
  const { data: integrations, isLoading: integrationLoading } =
    useUserIntegrationsQuery();
  const { data: userData, isLoading: userLoading } = useUserQuery();

  return (
    <div>
      {userData?.contacts &&
        integrations &&
        userData.contacts.map((contact) => {
          return (
            <Contact
              contact={contact}
              userData={userData}
              integrations={integrations}
            />
          );
        })}
    </div>
  );
}
