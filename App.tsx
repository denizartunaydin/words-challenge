import React from "react";
import { Provider } from "react-redux";
import store from "./src/store/appStore";

import RootLayout from "./src/layouts/root.layout";

const App = () => {
  return (
    <Provider store={store}>
      <RootLayout></RootLayout>
    </Provider>
  );
};

export default App;
