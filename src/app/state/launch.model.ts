export interface LaunchPatch {
  small: string | null;
  large: string | null;
}

export interface LaunchReddit {
  campaign: string | null;
  launch: string | null;
  media: string | null;
  recovery: string | null;
}

export interface LaunchFlickr {
  small: string[];
  original: string[];
}

export interface LaunchLinks {
  patch: LaunchPatch;
  reddit: LaunchReddit;
  flickr: LaunchFlickr;
  presskit: string | null;
  webcast: string | null;
  youtube_id: string | null;
  article: string | null;
  wikipedia: string | null;
}

export interface Launch {
  id: string;
  name: string;
  flight_number: number;
  date_utc: string;
  date_unix: number;
  date_local: string;
  date_precision: string;
  static_fire_date_utc: string | null;
  static_fire_date_unix: number | null;
  tdb: boolean;
  net: boolean;
  window: number | null;
  rocket: string;
  success: boolean | null;
  failures: any[];
  details: string | null;
  crew: any[];
  ships: string[];
  capsules: string[];
  payloads: string[];
  launchpad: string;
  auto_update: boolean;
  flight_club: string | null;
  links: LaunchLinks;
  fairings: any;
  upcoming: boolean;
  isFavorite?: boolean;
}
