import ApolloClient from "apollo-boost";
import App, { Container } from "next/app";
import Head from "next/head";
import { ApolloProvider } from "react-apollo";

import withApollo from "../src/client/utils/withApollo";

class MyApp extends App<{ apollo: ApolloClient<any> }> {
  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <Container>
        <Head>
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />
        </Head>

        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
