export interface VirusTotalDataInterface {
  attributes: {
    last_dns_records: Array<any>;
    jarm: string;
    whois: string;
    last_https_certificate_date: number;
    tags: Array<string>;
    popularity_ranks: Array<any>;
    last_analysis_date: number;
    last_dns_records_date: number;
    last_analysis_stats: Array<string>;
    creation_date: number;
    whois_date: number;
    reputation: number;
    registrar: string;
    last_analysis_results: Array<string>;
    last_update_date: number;
    last_modification_date: number;
    tld: string;
    last_https_certificate: Array<string>;
    categories: Array<string>;
    total_votes: Array<string>;
  };
  type: string;
  id: string;
  links: { self: string };
}

export interface IResolvedValues {
  valid: boolean;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  validFor: string[];
}
