import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//Adding Apollo Information
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
//Importing setContext
import { setContext } from "@apollo/client/link/context";

//Importing the Login and Signup Forms
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";

//Constructing the main GraphQL endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

//Constructing request middelware that will attach the JWT to every request and an authorization header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//Setting up our client to execute the authLink middleware prior to making the request to gql
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/searchBooks" elements={<SearchBooks />} />
            <Route path="/savedBooks" element={<SavedBooks />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
