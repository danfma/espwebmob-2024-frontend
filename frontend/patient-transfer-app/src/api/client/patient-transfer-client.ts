import {AuthByPasswordData, AuthenticationData, HospitalData} from "@app/api";

export function createPatientTransferClient () {
  function buildResponse (response: Response) {
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
  }

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
      return headers["Authorization"] ?? null;
    },

    async getJson (url: string) {
      const response = await fetch(url, {
        method: "GET",
        headers: headers
      });

      return buildResponse(response);
    },

    async postJson<TRequest>(url: string, request: TRequest) {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(request)
      });

      return buildResponse(response);
    }
  };

  return {
    auth: {
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
    },

    user: {
      async loadHospital () {
        const response = await jsonHttpClient.getJson("/api/user/hospital");

        return response.jsonAs<HospitalData>();
      }
    }
  };
}

export type PatientTransferClient = ReturnType<typeof createPatientTransferClient>;
