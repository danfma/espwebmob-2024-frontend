import {Route, Routes} from "react-router";
import AdminIndex from "./areas/admin/Index";
import PublicIndex from "./areas/public/Index";
import {useUserStore} from "./shared/hooks";
import NotFound from "./NotFound.tsx";
import {Button} from "@views/shared/ui/button.tsx";

function App () {
  const {isAuthenticated} = useUserStore();

  return (
    <>
      <Button>Hello world!</Button>
      <Routes>
        {isAuthenticated.value &&
          <>
            <Route path="admin">
              <Route path="*" index element={<AdminIndex />} />
            </Route>

            <Route path="doctor">
              <Route path="*" index element={<AdminIndex />} />
            </Route>
          </>
        }

        <Route index element={<PublicIndex />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
