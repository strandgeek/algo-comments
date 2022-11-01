import React, { FC } from 'react';
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { Config } from './types/config';
import { CommentsWidget } from './components/CommentsWidget';

const App: FC<{ client: ApolloClient<any>, config: Config }> = ({ client, config }) => {
  return (
    <ApolloProvider client={client}>
      <CommentsWidget config={config} />
    </ApolloProvider>
  );
}

export default App;
