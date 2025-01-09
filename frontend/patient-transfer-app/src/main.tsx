import "./index.css";

import {createPatientTransferClient} from "@app/api";
import {createAuthService} from "@app/domain/auth";
import {createHospitalService} from "@app/domain/hospital";
import {createHospitalOverviewStore, createUserStore} from "@app/stores";
import {DomainServicesProvider, HospitalOverviewProvider, UserStoreProvider} from "@app/views/contexts";
import {ChakraProvider, defaultSystem, Theme} from "@chakra-ui/react";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router";

import {App} from "./app.tsx";

const client = createPatientTransferClient("http://localhost:8000");

// Create domain services
const domainServices = {
  authService: createAuthService(client),
  hospitalService: createHospitalService(client)
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
              <Theme>
                <App />
              </Theme>
            </ChakraProvider>
          </HospitalOverviewProvider>
        </UserStoreProvider>
      </DomainServicesProvider>
    </BrowserRouter>
  </StrictMode>
);
