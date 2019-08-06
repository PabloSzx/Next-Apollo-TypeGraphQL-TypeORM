import gql from "graphql-tag";
import { NextPage } from "next";
import Head from "next/head";
import { useQuery } from "react-apollo";

import { User } from "../src/server/entities/user";

const Home: NextPage = () => {
  const { loading, data } = useQuery<{ users: User[] }>(
    gql`
      query {
        users {
          firstName
          id
        }
      }
    `,
    {}
  );

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <p>{!loading && data ? JSON.stringify(data, null, 4) : "loading..."}</p>
      </div>
    </>
  );
};

export default Home;
