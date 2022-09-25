import Head from "next/head";
import { IntegrationSetup } from "../../components/integration-setup/integration-setup";
import LoadingSpinner from "../../components/spinner/spinner";
import { useUserIntegrationsQuery, useUserQuery } from "../../redux/apis/blinq";
import styles from "../../styles/settings.module.scss";

export default function Contacts() {
  const { data: integrations, isLoading: integrationLoading } =
    useUserIntegrationsQuery();
  const { data: userData, isLoading: userLoading } = useUserQuery();

  return (
    <div className={styles.container}>
      <Head>
        <title>Blinq • Settings</title>
        <meta name='description' content='Change user settings' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div>
          <h1>User Settings</h1>
          {userData ? (
            <div>
              <div>First Name: {userData.given_name}</div>
              <div>Last Name: {userData.family_name}</div>
              <div>Email: {userData.email}</div>
            </div>
          ) : (
            <LoadingSpinner />
          )}
          <h2>Integrations</h2>
          {userLoading && integrationLoading ? (
            <LoadingSpinner />
          ) : (
            integrations &&
            userData && (
              <IntegrationSetup
                integrations={integrations}
                userData={userData}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}
