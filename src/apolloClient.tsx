import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

const httpLink = new HttpLink({
  uri: 'https://graphql.staging.kima.finance/v1/graphql',
  headers: {}
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://graphql.staging.kima.finance/v1/graphql',
    connectionParams: {
      headers: {}
    }
  })
)

const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query)
    return (
      def.kind === 'OperationDefinition' && def.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
})
