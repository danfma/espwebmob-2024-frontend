import {Route, Routes} from "react-router";

// TODO Usar lazy-loading para as áreas
import {IndexPage as DoctorIndexPage} from "./views/areas/doctor/index-page.tsx";
import {IndexPage as PublicIndex} from "./views/areas/public/index-page.tsx";
import {LoginPage} from "./views/areas/public/login-page.tsx";
import {NotFoundPage} from "./views/not-found-page.tsx";

export function App () {
  // TODO Aplicar proteção de rotas (autorização)
  return (
    <>
      <Routes>
        <Route path="doctor">
          <Route index element={<DoctorIndexPage />} />
        </Route>

        <Route path="login" element={<LoginPage />} />

        <Route index element={<PublicIndex />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
