import "./index.css";

import {createClientOnlyAuthService} from "@app/domain/auth";
import {createClientOnlyHospitalService} from "@app/domain/hospital";
import {createHospitalOverviewStore, createUserStore} from "@app/stores";
import {App} from "@app/views/app.tsx";
import {DomainServicesProvider, HospitalOverviewProvider, UserStoreProvider} from "@app/views/contexts";
import {ChakraProvider, defaultSystem, Theme} from "@chakra-ui/react";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router";

// Create domain services
const domainServices = {
  authService: createClientOnlyAuthService(),
  hospitalService: createClientOnlyHospitalService()
};

const userStore = createUserStore();
const hospitalOverviewStore = createHospitalOverviewStore(domainServices.hospitalService);

const container = document.getElementById("root")!;

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <DomainServicesProvider value={domainServices}>
        <UserStoreProvider value={userStore}>
          <HospitalOverviewProvider value={hospitalOverviewStore}>
            <ChakraProvider value={defaultSystem}>
              <Theme appearance="light" colorPalette="blue">
                <App />
              </Theme>
            </ChakraProvider>
          </HospitalOverviewProvider>
        </UserStoreProvider>
      </DomainServicesProvider>
    </BrowserRouter>
  </StrictMode>
);
