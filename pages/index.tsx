import gql from "graphql-tag";
import { NextPage } from "next";
import Head from "next/head";
import { useQuery } from "react-apollo-hooks";

const Home: NextPage = () => {
  const { loading, data } = useQuery<{ title: string; author: string }[]>(
    gql`
      query {
        books {
          title
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
