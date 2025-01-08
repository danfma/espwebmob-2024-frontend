import {AuthenticatedUser} from "@app/domain/auth";
import {applyEvent, createEmptyHospital, HospitalService} from "@app/domain/hospital";
import {signal} from "@preact/signals-react";
import {Subscription} from "rxjs";

export function createHospitalOverviewStore (hospitalService: HospitalService) {
  const hospital = signal(createEmptyHospital());
  const isLoading = signal(false);
  let subscription: Subscription | null = null;

  const listenAndApplyEvents = async () => {
    subscription?.unsubscribe();
    subscription = hospitalService.listen().subscribe((event) => {
      hospital.value = applyEvent(hospital.value, event);
    });
  };

  const loadUserHospital = async (user: AuthenticatedUser) => {
    hospitalService.setAuthorizationToken(user.accessToken);
    isLoading.value = true;

    try {
      hospital.value = await hospitalService.load();
      await listenAndApplyEvents();
    } catch (e) {
      // TODO Handle the error
      console.log(e);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    hospital,
    isLoading,
    loadUserHospital
  };
}

export type HospitalOverviewStore = ReturnType<typeof createHospitalOverviewStore>;
