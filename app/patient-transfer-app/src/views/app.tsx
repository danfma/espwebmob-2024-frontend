import {Route, Routes} from "react-router";

// TODO Usar lazy-loading para as áreas
import {IndexPage as DoctorIndexPage} from "./areas/doctor/index-page.tsx";
import {IndexPage as PublicIndex} from "./areas/public/index-page.tsx";
import {LoginPage} from "./areas/public/login-page.tsx";
import {NotFoundPage} from "./not-found-page.tsx";

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
