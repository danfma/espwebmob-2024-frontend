import {Route, Routes} from "react-router";
import AdminIndex from "./areas/admin/Index";
import PublicIndex from "./areas/public/Index";

function App () {
  return (
    <Routes>
      <Route path="admin">
        <Route path="*" index element={<AdminIndex />} />
      </Route>

      <Route path="*">
        <Route index element={<PublicIndex />} />
      </Route>
    </Routes>
  );
}

export default App;
