import { useState } from "react";
import { Integration, IntegrationData, User } from "../../database";
import styles from "../../styles/integration-setup.module.scss";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useSetUserIntegrationMutation } from "../../redux/apis/blinq";

type IntegrationSetupProps = {
  integrations: Integration[];
  userData: User;
};

type IntegrationProps = {
  integration: Integration;
  userData: User;
};

const Integration = ({ integration, userData }: IntegrationProps) => {
  const { image_url, name } = integration;
  const [formState, setFormState] = useState({});

  const userHasIntegration = userData?.integrations?.[integration.id];
  const [setUserIntegrationTrigger, { isLoading }] =
    useSetUserIntegrationMutation();

  const click = () => {
    setUserIntegrationTrigger({
      userId: "asd",
      integrationId: "asdsa",
      integrationData: { api_key: "adasd" },
    });
  };

  return (
    <div className={styles.integrationWrapper}>
      <div className={styles.integrationTitleWrapper}>
        <div className={styles.integrationImage}>
          <img src={image_url} />
        </div>
        <div className={styles.integrationTitle}>{name}</div>
      </div>

      {userHasIntegration ? (
        <div>Already Linked</div>
      ) : (
        <Popup
          trigger={<button onClick={() => setFormState({})}>Link</button>}
          position='right center'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUserIntegrationTrigger({
                userId: userData.id,
                integrationId: integration.id,
                integrationData: formState as IntegrationData,
              });
            }}>
            <label>
              Link Integration
              {integration.keys.map((key) => {
                return (
                  <input
                    key={key}
                    type='text'
                    defaultValue={key}
                    onChange={(e) =>
                      setFormState({ ...formState, [key]: e.target.value })
                    }></input>
                );
              })}
              <input type='submit' />
            </label>
          </form>{" "}
        </Popup>
      )}
    </div>
  );
};

export const IntegrationSetup = ({
  integrations,
  userData,
}: IntegrationSetupProps) => {
  return (
    <div>
      {integrations.map((integration) => (
        <Integration
          key={integration.id}
          integration={integration}
          userData={userData}
        />
      ))}
    </div>
  );
};
