import "./App.scss";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import * as ROUTES from "./routes";

const BookMarketPage = lazy(() => import("./pages/books/index"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={"Loading..."}>
        <Route
          path={ROUTES.BOOKS_MARKET_PAGE}
          component={BookMarketPage}
          exact
        />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
