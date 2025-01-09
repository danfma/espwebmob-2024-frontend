import {AuthByPasswordData, AuthenticationData, HospitalData, HospitalHubEvent} from "@app/api";
import {HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {Observable} from "rxjs";

export function createPatientTransferClient (baseUrl = "/") {
  const buildResponse = (response: Response) => {
    if (!response.ok) {
      // TODO add a better error handling mechanism
      throw new Error(`Http failed with code: ${response.status}: ${response.statusText}`);
    }

    return {
      completed () {
        return Promise.resolve(response.ok);
      },

      async jsonAs<TResponse>() {
        return await response.json() as TResponse;
      }
    };
  };

  const buildUrl = (path: string): string => `${baseUrl}${path}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  const AUTHORIZATION_KEY = "Authorization";

  const jsonHttpClient = {
    setAuthorizationToken (authorization: string | null) {
      if (authorization) {
        headers[AUTHORIZATION_KEY] = `Bearer ${authorization}`;
      } else {
        delete headers[AUTHORIZATION_KEY];
      }
    },

    getAuthorizationToken () {
      return headers["Authorization"]?.replace("Bearer ", "") ?? null;
    },

    async getJson (url: string) {
      const response = await fetch(buildUrl(url), {
        method: "GET",
        headers: headers
      });

      return buildResponse(response);
    },

    async postJson<TRequest>(url: string, request: TRequest) {
      const response = await fetch(buildUrl(url), {
        method: "POST",
        headers: headers,
        body: JSON.stringify(request)
      });

      return buildResponse(response);
    }
  };

  const auth = {
    async authenticate (username: string, password: string) {
      const response = await jsonHttpClient.postJson<AuthByPasswordData>("/api/auth", {
        username,
        password
      });

      return response.jsonAs<AuthenticationData | null>();
    },

    setAuthorizationToken (authorization: string | null) {
      jsonHttpClient.setAuthorizationToken(authorization);
    },

    getAuthorizationToken (): string | null {
      return jsonHttpClient.getAuthorizationToken();
    }
  };

  const user = {
    async loadHospital () {
      const response = await jsonHttpClient.getJson("/api/user/hospital");

      return response.jsonAs<HospitalData>();
    }
  };

  const hubs = {
    hospital (): Observable<HospitalHubEvent> {
      const hub = new HubConnectionBuilder().
        withUrl(`${baseUrl}/api/hubs/hospital`, {
          accessTokenFactory: (): string | Promise<string> => auth.getAuthorizationToken() ?? ""
        }).
        withAutomaticReconnect().
        build();

      return new Observable<HospitalHubEvent>((observer) => {
        console.log("Subscribing to get hospital events...");

        hub.onreconnecting((error) => {
          console.error(error);
          observer.next({type: "Reconnecting"});
        });

        hub.on("HospitalLoaded", (...data: any[]) => {
          console.log("RECEIVED HospitalLoaded", ...data);
        });

        const connect = async () => {
          console.log("Connecting to hub...");
          await hub.start();
          console.log("Connected");
          observer.next({type: "Connected"});
          await hub.send("Watch");
        };

        connect().catch(console.error);

        return () => {
          hub.stop().catch(console.error);
        };
      });
    }
  };

  return {
    auth,
    user,
    hubs
  };
}

export type PatientTransferClient = ReturnType<typeof createPatientTransferClient>;
