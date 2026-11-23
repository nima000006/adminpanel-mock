declare module "matomo-tracker" {
  export interface MatomoTrackParams {
    url?: string;
    action_name?: string;
    urlref?: string;
    e_c?: string;
    e_a?: string;
    e_n?: string;
    e_v?: number;
    uid?: string;
    search?: string;
    search_cat?: string;
    search_count?: number;
    [key: string]: any;
  }

  export default class MatomoTracker {
    constructor(siteId: number, url: string);

    // generic tracking
    track(params: MatomoTrackParams): void;
  }
}
