import ApolloClient from "apollo-boost";
import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as HooksApolloProvider } from "react-apollo-hooks";

import withApollo from "../src/client/utils/withApollo";

class MyApp extends App<{ apollo: ApolloClient<any> }> {
  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <Container>
        <HooksApolloProvider client={apollo}>
          <ApolloProvider client={apollo}>
            <Component {...pageProps} />
          </ApolloProvider>
        </HooksApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
