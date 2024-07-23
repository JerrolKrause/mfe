import { gql } from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Datetime: { input: any; output: any; }
  JsonObject: { input: any; output: any; }
  reportDate_String_NotNull_format_date: { input: any; output: any; }
};

export enum ApplicantType {
  /** The name of the Applicant */
  Applicant = 'APPLICANT',
  /** The name of the Co-Applicant */
  CoApplicant = 'CO_APPLICANT'
}

export type ApplicationMutations = {
  __typename?: 'ApplicationMutations';
  /** Receive browser events */
  receiveBrowserEvent?: Maybe<CommonStatusResponse>;
};


export type ApplicationMutationsReceiveBrowserEventArgs = {
  input: ReceiveBrowserEventInput;
};

export type BankAccount = {
  __typename?: 'BankAccount';
  account?: Maybe<Scalars['String']['output']>;
  deposits?: Maybe<Array<Maybe<BankAccountTransaction>>>;
  institution?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type BankAccountTransaction = {
  __typename?: 'BankAccountTransaction';
  amount?: Maybe<Scalars['Float']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

export enum BrowserEventType {
  Plaid = 'PLAID'
}

export type CashflowMutations = {
  __typename?: 'CashflowMutations';
  /** Evaluate Finicity VOIA report through the BAT score model. */
  evaluateFinicityReport?: Maybe<EvaluateFinicityReportResponse>;
  /** Run Finicity calulator with report, applicant names */
  runFinicityCalculator?: Maybe<RunFinicityCalculatorResponse>;
  /** Run Finicity calculator with workflowId */
  runFinicityCalculatorByWorkflow?: Maybe<RunFinicityCalculatorResponse>;
  /** Run Plaid calulator with report, applicant names */
  runPlaidCalculator?: Maybe<RunPlaidCalculatorResponse>;
  /** Run Plaid calculator with workflowId */
  runPlaidCalculatorByWorkflow?: Maybe<RunPlaidCalculatorResponse>;
};


export type CashflowMutationsEvaluateFinicityReportArgs = {
  input: EvaluateFinicityReportInput;
};


export type CashflowMutationsRunFinicityCalculatorArgs = {
  input: RunFinicityCalculatorInput;
};


export type CashflowMutationsRunFinicityCalculatorByWorkflowArgs = {
  input: RunFinicityCalculatorByWorkflowInput;
};


export type CashflowMutationsRunPlaidCalculatorArgs = {
  input: RunPlaidCalculatorInput;
};


export type CashflowMutationsRunPlaidCalculatorByWorkflowArgs = {
  input: RunPlaidCalculatorByWorkflowInput;
};

export type CommonStatusResponse = {
  __typename?: 'CommonStatusResponse';
  reason?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ResponseStatus>;
};

export type CreateProviderResultInput = {
  provider: VerificationProvider;
  result: Scalars['JsonObject']['input'];
  workflowId: Scalars['ID']['input'];
};

export type CreateProviderResultResponse = {
  __typename?: 'CreateProviderResultResponse';
  providerResultId: Scalars['ID']['output'];
};

export type DeleteWaterfallResultResponse = {
  __typename?: 'DeleteWaterfallResultResponse';
  workflowId: Scalars['String']['output'];
};

export type DownloadAssetReportResponse = {
  __typename?: 'DownloadAssetReportResponse';
  jsonS3Url?: Maybe<Scalars['String']['output']>;
  pdfS3Url?: Maybe<Scalars['String']['output']>;
};

export enum EmploymentStatusV2 {
  Employed = 'EMPLOYED',
  Other = 'OTHER',
  Retired = 'RETIRED',
  SelfEmployed = 'SELF_EMPLOYED'
}

export type EvaluateFinicityReportInput = {
  workflowId: Scalars['ID']['input'];
};

export type EvaluateFinicityReportResponse = {
  __typename?: 'EvaluateFinicityReportResponse';
  reason?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['JsonObject']['output']>;
  status?: Maybe<ResponseStatus>;
};

export type ExchangePublicTokenInput = {
  customerId: Scalars['ID']['input'];
  publicToken: Scalars['String']['input'];
  uniqueTrackingCode: Scalars['String']['input'];
};

export type FdcOfframp = {
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
};

/** Finicity report data */
export type FinicityData = {
  __typename?: 'FinicityData';
  /** The path to the JSON format. */
  jsonUrl?: Maybe<Scalars['String']['output']>;
};

export type HealthCheckResponse = {
  __typename?: 'HealthCheckResponse';
  details?: Maybe<Scalars['JsonObject']['output']>;
  observedAt: Scalars['Datetime']['output'];
  status: HealthStatus;
};

export type HealthQueries = {
  __typename?: 'HealthQueries';
  awsSecrets?: Maybe<HealthCheckResponse>;
  batScore?: Maybe<HealthCheckResponse>;
  class?: Maybe<HealthCheckResponse>;
  database?: Maybe<HealthCheckResponse>;
  plaid?: Maybe<HealthCheckResponse>;
  s3?: Maybe<HealthCheckResponse>;
  theWorkNumber?: Maybe<HealthCheckResponse>;
  zeebe?: Maybe<HealthCheckResponse>;
};

export enum HealthStatus {
  Healthy = 'HEALTHY',
  Unhealthy = 'UNHEALTHY',
  Unknown = 'UNKNOWN'
}

export enum IvWaterfallType {
  A = 'A',
  B = 'B',
  F = 'F',
  N = 'N',
  P = 'P',
  Space = 'SPACE',
  X = 'X',
  Y = 'Y'
}

export type IvNonPiiWorkflow = {
  __typename?: 'IvNonPIIWorkflow';
  applicantType?: Maybe<Scalars['String']['output']>;
  applicationId?: Maybe<Scalars['String']['output']>;
  bpmnProcessId: Scalars['ID']['output'];
  branchId?: Maybe<Scalars['String']['output']>;
  cbReferenceId?: Maybe<Scalars['String']['output']>;
  costCenter?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  customerId?: Maybe<Scalars['String']['output']>;
  disclosedIncome?: Maybe<Scalars['Float']['output']>;
  dispositionCode?: Maybe<Scalars['String']['output']>;
  employerName?: Maybe<Scalars['String']['output']>;
  employmentEndDate?: Maybe<Scalars['Int']['output']>;
  employmentStartDate?: Maybe<Scalars['Int']['output']>;
  employmentStatus?: Maybe<Scalars['String']['output']>;
  employmentStatusIndicator?: Maybe<Scalars['String']['output']>;
  fdcOfframpCode?: Maybe<Scalars['String']['output']>;
  fdcOfframpDescription?: Maybe<Scalars['String']['output']>;
  fdcOfframpKey?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isFdcEligible?: Maybe<Scalars['Boolean']['output']>;
  ivWaterfallType?: Maybe<Scalars['String']['output']>;
  jobType?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JsonObject']['output']>;
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  payFrequency?: Maybe<Scalars['String']['output']>;
  processInstanceKey?: Maybe<Scalars['String']['output']>;
  remainingEightDigits?: Maybe<Scalars['String']['output']>;
  terminated?: Maybe<Scalars['Boolean']['output']>;
  uniqueTrackingCode?: Maybe<Scalars['String']['output']>;
  waterfallMode?: Maybe<Scalars['String']['output']>;
};

export type IvProviderStatus = {
  __typename?: 'IvProviderStatus';
  provider: VerificationProvider;
  status: IvStatusType;
  timestamp: Scalars['DateTime']['output'];
};

export type IvState = {
  __typename?: 'IvState';
  applicantType?: Maybe<ApplicantType>;
  cbReferenceId?: Maybe<Scalars['String']['output']>;
  dispositionCode?: Maybe<Scalars['String']['output']>;
  isFdcEligible?: Maybe<Scalars['Boolean']['output']>;
  metadata?: Maybe<Scalars['JsonObject']['output']>;
  providerStatusCurrent?: Maybe<IvProviderStatus>;
  providerStatuses?: Maybe<Array<Maybe<IvProviderStatus>>>;
  terminated?: Maybe<Scalars['Boolean']['output']>;
  waterfallMode?: Maybe<WaterfallMode>;
  waterfallType?: Maybe<IvWaterfallType>;
  workflowId?: Maybe<Scalars['ID']['output']>;
};

export enum IvStatusType {
  Cp = 'CP',
  Ip = 'IP',
  Nd = 'ND',
  Rq = 'RQ'
}

export type IvWaterfallInput = {
  applicantType: ApplicantType;
  applicationId: Scalars['String']['input'];
  bpmnProcessId: Scalars['ID']['input'];
  branchId: Scalars['String']['input'];
  cbReferenceId: Scalars['String']['input'];
  costCenter?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  disclosedIncome?: InputMaybe<Scalars['Float']['input']>;
  dispositionCode?: InputMaybe<Scalars['String']['input']>;
  employerName?: InputMaybe<Scalars['String']['input']>;
  employmentEndDate?: InputMaybe<Scalars['Int']['input']>;
  employmentStartDate?: InputMaybe<Scalars['Int']['input']>;
  employmentStatus?: InputMaybe<EmploymentStatusV2>;
  employmentStatusIndicator?: InputMaybe<Scalars['String']['input']>;
  fdcOfframp?: InputMaybe<FdcOfframp>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isFdcEligible?: InputMaybe<Scalars['Boolean']['input']>;
  ivWaterfallType: IvWaterfallType;
  jobType?: InputMaybe<JobType>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  payFrequency?: InputMaybe<PayFrequency>;
  remainingEightDigits?: InputMaybe<Scalars['String']['input']>;
  ssn?: InputMaybe<Scalars['String']['input']>;
  uniqueTrackingCode: Scalars['String']['input'];
  waterfallMode: WaterfallMode;
};

export type IvWaterfallResponse = {
  __typename?: 'IvWaterfallResponse';
  processInstanceKey?: Maybe<Scalars['String']['output']>;
};

export type IvWaterfallResult = {
  __typename?: 'IvWaterfallResult';
  classResult?: Maybe<Scalars['JsonObject']['output']>;
  diff?: Maybe<Scalars['JsonObject']['output']>;
  ivaasResult?: Maybe<Scalars['JsonObject']['output']>;
  metadata?: Maybe<Scalars['JsonObject']['output']>;
  succeeded?: Maybe<Scalars['Boolean']['output']>;
  workflowId: Scalars['ID']['output'];
};

export type IvWaterfallResultInput = {
  classResult?: InputMaybe<Scalars['JsonObject']['input']>;
  diff?: InputMaybe<Scalars['JsonObject']['input']>;
  ivaasResult?: InputMaybe<Scalars['JsonObject']['input']>;
  succeeded?: InputMaybe<Scalars['Boolean']['input']>;
  workflowId: Scalars['ID']['input'];
};

export type IvWaterfallResultUpdateInput = {
  classResult?: InputMaybe<Scalars['JsonObject']['input']>;
  diff?: InputMaybe<Scalars['JsonObject']['input']>;
  succeeded?: InputMaybe<Scalars['Boolean']['input']>;
  workflowId: Scalars['ID']['input'];
};

export type IvWaterfallWorkflow = {
  __typename?: 'IvWaterfallWorkflow';
  applicantType?: Maybe<Scalars['String']['output']>;
  applicationId?: Maybe<Scalars['String']['output']>;
  bpmnProcessId: Scalars['ID']['output'];
  branchId?: Maybe<Scalars['String']['output']>;
  cbReferenceId?: Maybe<Scalars['String']['output']>;
  costCenter?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  customerId?: Maybe<Scalars['String']['output']>;
  disclosedIncome?: Maybe<Scalars['Float']['output']>;
  dispositionCode?: Maybe<Scalars['String']['output']>;
  employerName?: Maybe<Scalars['String']['output']>;
  employmentEndDate?: Maybe<Scalars['Int']['output']>;
  employmentStartDate?: Maybe<Scalars['Int']['output']>;
  employmentStatus?: Maybe<Scalars['String']['output']>;
  employmentStatusIndicator?: Maybe<Scalars['String']['output']>;
  fdcOfframpCode?: Maybe<Scalars['String']['output']>;
  fdcOfframpDescription?: Maybe<Scalars['String']['output']>;
  fdcOfframpKey?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  isFdcEligible?: Maybe<Scalars['Boolean']['output']>;
  ivWaterfallType?: Maybe<Scalars['String']['output']>;
  jobType?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JsonObject']['output']>;
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  payFrequency?: Maybe<Scalars['String']['output']>;
  processInstanceKey?: Maybe<Scalars['String']['output']>;
  remainingEightDigits?: Maybe<Scalars['String']['output']>;
  ssn?: Maybe<Scalars['String']['output']>;
  terminated?: Maybe<Scalars['Boolean']['output']>;
  uniqueTrackingCode?: Maybe<Scalars['String']['output']>;
  waterfallMode?: Maybe<Scalars['String']['output']>;
};

export type IvWorkflowSearchInput = {
  endTime: Scalars['DateTime']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  startTime: Scalars['DateTime']['input'];
  waterfallType?: InputMaybe<IvWaterfallType>;
};

export type IvWorkflowSearchResponse = {
  __typename?: 'IvWorkflowSearchResponse';
  count?: Maybe<Scalars['Int']['output']>;
  workflows?: Maybe<Array<Maybe<IvNonPiiWorkflow>>>;
};

export enum JobType {
  Fulltime = 'FULLTIME',
  Parttime = 'PARTTIME'
}

export type LinkInput = {
  customerId: Scalars['ID']['input'];
  uniqueTrackingCode: Scalars['String']['input'];
};

export type LinkResponse = {
  __typename?: 'LinkResponse';
  expiration?: Maybe<Scalars['String']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ResponseStatus>;
  token?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  application?: Maybe<ApplicationMutations>;
  cashflow?: Maybe<CashflowMutations>;
  ping?: Maybe<Scalars['String']['output']>;
  plaid?: Maybe<PlaidMutations>;
  /** Verification-related mutations */
  verification?: Maybe<VerificationMutations>;
  workflow?: Maybe<WorkflowMutations>;
};

export enum PayFrequency {
  Biweekly = 'BIWEEKLY',
  Daily = 'DAILY',
  Hourly = 'HOURLY',
  Monthly = 'MONTHLY',
  Semimonthly = 'SEMIMONTHLY',
  Weekly = 'WEEKLY'
}

/** Plaid report data */
export type PlaidData = {
  __typename?: 'PlaidData';
  /** The path to the JSON format. */
  jsonUrl?: Maybe<Scalars['String']['output']>;
  /** The path to the PDF format. */
  pdfUrl?: Maybe<Scalars['String']['output']>;
};

export type PlaidMutations = {
  __typename?: 'PlaidMutations';
  /** Download asset report */
  downloadAssetReport?: Maybe<DownloadAssetReportResponse>;
  /** Exchange public_token for access_token */
  exchangePublicToken?: Maybe<CommonStatusResponse>;
  /** Asset report PRODUCT_READY webhook from Plaid */
  receiveAssetReportWebhook?: Maybe<CommonStatusResponse>;
  /** Request Plaid to generate the asset report */
  runAssetReport?: Maybe<CommonStatusResponse>;
};


export type PlaidMutationsDownloadAssetReportArgs = {
  workflowId: Scalars['ID']['input'];
};


export type PlaidMutationsExchangePublicTokenArgs = {
  input: ExchangePublicTokenInput;
};


export type PlaidMutationsReceiveAssetReportWebhookArgs = {
  assetReportWebhookPayload: Scalars['String']['input'];
};


export type PlaidMutationsRunAssetReportArgs = {
  input: RunAssetReportInput;
};

export type PlaidQueries = {
  __typename?: 'PlaidQueries';
  /** Generate Plaid UI link_token */
  link?: Maybe<LinkResponse>;
};


export type PlaidQueriesLinkArgs = {
  input: LinkInput;
};

export type Query = {
  __typename?: 'Query';
  healthQueries?: Maybe<HealthQueries>;
  ping?: Maybe<Scalars['String']['output']>;
  plaid?: Maybe<PlaidQueries>;
  /** Verification-related queries */
  verification?: Maybe<VerificationQueries>;
  workflow?: Maybe<WorkflowQueries>;
};

export type ReceiveBrowserEventInput = {
  customerId: Scalars['ID']['input'];
  event: Scalars['String']['input'];
  metadata: Scalars['JsonObject']['input'];
  type: BrowserEventType;
  uniqueTrackingCode: Scalars['String']['input'];
};

export enum ResponseStatus {
  Error = 'ERROR',
  Success = 'SUCCESS',
  Unknown = 'UNKNOWN'
}

export type RunAssetReportInput = {
  plaidAccessTokenId: Scalars['String']['input'];
  workflowId: Scalars['ID']['input'];
};

export type RunFinicityCalculatorByWorkflowInput = {
  /** ID of the workflow for the report */
  workflowId: Scalars['String']['input'];
};

export type RunFinicityCalculatorInput = {
  /** The name of the borrower. */
  applicantName: Scalars['String']['input'];
  /** The name of the co-borrower. */
  coApplicantName: Scalars['String']['input'];
  /** The Finicity VOAI (Verification of Assets and Income) report. */
  report: Scalars['JsonObject']['input'];
  /** The date when the report was created, e.g. '2023-06-24'. */
  reportDate: Scalars['reportDate_String_NotNull_format_date']['input'];
};

export type RunFinicityCalculatorResponse = {
  __typename?: 'RunFinicityCalculatorResponse';
  codeVersion?: Maybe<Scalars['String']['output']>;
  evaluatedAccounts?: Maybe<Scalars['JsonObject']['output']>;
  ruleVersion?: Maybe<Scalars['String']['output']>;
};

export type RunIncomeVerificationAsyncOptionsInput = {
  /** The amount of elapsed time (in minutes) before the request is considered stale. Default: expires after 24 hours. */
  expiresInMinutes?: InputMaybe<Scalars['Int']['input']>;
  /** Determines whether to return immediately or wait for response from provider. Default: returns immediately with PENDING status. */
  synchronize?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RunIncomeVerificationInput = {
  /** The OMF loan application number. */
  applicationId: Scalars['ID']['input'];
  /** The Social Security Number of the applicant or co-applicant. */
  customerId: Scalars['ID']['input'];
  /** The verification source. */
  provider: VerificationProvider;
  /** Custom options that can supplied to the selected provider. */
  providerOptions?: InputMaybe<RunIncomeVerificationProviderOptionsInput>;
};

export type RunIncomeVerificationOptionsInput = {
  /** The amount of elapsed time (in minutes) before the request is considered stale. Default: expires after 1 day. */
  expiresInMinutes?: InputMaybe<Scalars['Int']['input']>;
};

export type RunIncomeVerificationProviderOptionsInput = {
  /** Additional parameters to supply to TWN service. */
  TWN?: InputMaybe<TheWorkNumberOptionsInput>;
};

export type RunPlaidCalculatorByWorkflowInput = {
  /** ID of the workflow for the report */
  workflowId: Scalars['String']['input'];
};

export type RunPlaidCalculatorInput = {
  /** The name of the borrower. */
  applicantName: Scalars['String']['input'];
  /** The name of the co-borrower. */
  coApplicantName: Scalars['String']['input'];
  /** The Plaid asset report. */
  report: Scalars['JsonObject']['input'];
  /** The date when the report was created, e.g. '2023-06-24'. */
  reportDate: Scalars['reportDate_String_NotNull_format_date']['input'];
};

export type RunPlaidCalculatorResponse = {
  __typename?: 'RunPlaidCalculatorResponse';
  reason?: Maybe<Scalars['String']['output']>;
  result?: Maybe<RunPlaidCalculatorResponseResult>;
  status: ResponseStatus;
};

export type RunPlaidCalculatorResponseResult = {
  __typename?: 'RunPlaidCalculatorResponseResult';
  jsonS3Url?: Maybe<Scalars['String']['output']>;
  validStreams?: Maybe<Scalars['Int']['output']>;
};

export type RunWorkflowIncomeVerificationInput = {
  /** The verification source. */
  provider: VerificationProvider;
  /** Custom options that can supplied to the selected provider. */
  providerOptions?: InputMaybe<RunIncomeVerificationProviderOptionsInput>;
  /** The identifier to an existing workflow instance. */
  workflowId: Scalars['ID']['input'];
};

export type SubmitFinicityReportInput = {
  report: Scalars['JsonObject']['input'];
  uniqueTrackingCode: Scalars['ID']['input'];
};

export type SubmitFinicityReportResponse = {
  __typename?: 'SubmitFinicityReportResponse';
  reason?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ResponseStatus>;
  waterfallMode?: Maybe<Scalars['String']['output']>;
};

export type TerminateIvWaterfallInput = {
  uniqueTrackingCode: Scalars['ID']['input'];
};

export type TerminateIvWaterfallResponse = {
  __typename?: 'TerminateIvWaterfallResponse';
  reason?: Maybe<Scalars['String']['output']>;
  status?: Maybe<ResponseStatus>;
};

/** TWN data payload */
export type TheWorkNumberData = {
  __typename?: 'TheWorkNumberData';
  /** The path to the JSON format. */
  jsonUrl?: Maybe<Scalars['String']['output']>;
  /** The path to the PDF format. */
  pdfUrl?: Maybe<Scalars['String']['output']>;
  /** The path to the XML format. */
  xmlUrl?: Maybe<Scalars['String']['output']>;
};

export enum TheWorkNumberEmployeeStatusCode {
  /** Active employment records */
  A = 'A',
  /** Inactive employment records */
  I = 'I'
}

/** Additional TWN-specific parameters to be supplied to `runIncomeVerification`. */
export type TheWorkNumberOptionsInput = {
  /** Determines whether active or inactive employment records should be returned. */
  employeeStatusFilter?: InputMaybe<TheWorkNumberEmployeeStatusCode>;
  /** Determines whether a PDF file should be generated or not. */
  generatePdf?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum UsState {
  Alabama = 'Alabama',
  Alaska = 'Alaska',
  Arizona = 'Arizona',
  Arkansas = 'Arkansas',
  California = 'California',
  Colorado = 'Colorado',
  Connecticut = 'Connecticut',
  Delaware = 'Delaware',
  Florida = 'Florida',
  Georgia = 'Georgia',
  Hawaii = 'Hawaii',
  Idaho = 'Idaho',
  Illinois = 'Illinois',
  Indiana = 'Indiana',
  Iowa = 'Iowa',
  Kansas = 'Kansas',
  Kentucky = 'Kentucky',
  Louisiana = 'Louisiana',
  Maine = 'Maine',
  Maryland = 'Maryland',
  Massachusetts = 'Massachusetts',
  Michigan = 'Michigan',
  Minnesota = 'Minnesota',
  Mississippi = 'Mississippi',
  Missouri = 'Missouri',
  Montana = 'Montana',
  Nebraska = 'Nebraska',
  Nevada = 'Nevada',
  NewHampshire = 'NewHampshire',
  NewJersey = 'NewJersey',
  NewMexico = 'NewMexico',
  NewYork = 'NewYork',
  NorthCarolina = 'NorthCarolina',
  NorthDakota = 'NorthDakota',
  Ohio = 'Ohio',
  Oklahoma = 'Oklahoma',
  Oregon = 'Oregon',
  Pennsylvania = 'Pennsylvania',
  RhodeIsland = 'RhodeIsland',
  SouthCarolina = 'SouthCarolina',
  SouthDakota = 'SouthDakota',
  Tennessee = 'Tennessee',
  Texas = 'Texas',
  Utah = 'Utah',
  Vermont = 'Vermont',
  Virginia = 'Virginia',
  Washington = 'Washington',
  WestVirginia = 'WestVirginia',
  Wisconsin = 'Wisconsin',
  Wyoming = 'Wyoming'
}

export type UpdateWorkflowStatusInput = {
  provider: VerificationProvider;
  type: Scalars['String']['input'];
  value: Scalars['String']['input'];
  workflowId: Scalars['ID']['input'];
};

export type UpdateWorkflowStatusResponse = {
  __typename?: 'UpdateWorkflowStatusResponse';
  workflowStatusId: Scalars['ID']['output'];
};

/** The state of a request verification */
export type Verification = {
  __typename?: 'Verification';
  /** The date/time when a request was started */
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  /** The data response for a given verification provider */
  data?: Maybe<VerificationData>;
  /** Error message received during a verification request */
  error?: Maybe<Scalars['String']['output']>;
  /** The unique identifier for the verification request */
  id?: Maybe<Scalars['ID']['output']>;
  /** The last date/time that the verification request state was updated */
  modifiedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The provider of the verification data */
  provider?: Maybe<VerificationProvider>;
  /** The current status of a verification request */
  status?: Maybe<VerificationStatus>;
  /** The identifier for a workflow instance */
  workflowId?: Maybe<Scalars['ID']['output']>;
};

/** Union type for the different verification data responses */
export type VerificationData = FinicityData | PlaidData | TheWorkNumberData;

export type VerificationMutations = {
  __typename?: 'VerificationMutations';
  /** Initiates a verification request. */
  runIncomeVerification?: Maybe<Verification>;
  /** Initiates a verification request. */
  runIncomeVerificationAsync?: Maybe<Verification>;
};


export type VerificationMutationsRunIncomeVerificationArgs = {
  input: RunIncomeVerificationInput;
  options?: InputMaybe<RunIncomeVerificationOptionsInput>;
};


export type VerificationMutationsRunIncomeVerificationAsyncArgs = {
  input: RunIncomeVerificationInput;
  options?: InputMaybe<RunIncomeVerificationAsyncOptionsInput>;
};

/** The supported verification sources */
export enum VerificationProvider {
  Finicity = 'FINICITY',
  Plaid = 'PLAID',
  Powerlytics = 'POWERLYTICS',
  /** The Work Number */
  Twn = 'TWN'
}

export type VerificationQueries = {
  __typename?: 'VerificationQueries';
  /** Checks the status of a verification request. */
  incomeVerification?: Maybe<Verification>;
};


export type VerificationQueriesIncomeVerificationArgs = {
  verificationId: Scalars['ID']['input'];
};

/** The possible states of a verification request */
export enum VerificationStatus {
  /** The state when a verification request has successfully completed. */
  Completed = 'COMPLETED',
  /** The state when an error has occurred while processing a verification request. */
  Error = 'ERROR',
  /** The state when a verification request is waiting for a response from the provider. */
  Pending = 'PENDING',
  /** The state when a verification request has been received but not yet initiated with the provider. */
  Started = 'STARTED'
}

export enum WaterfallMode {
  Class = 'CLASS',
  Ivaas = 'IVAAS',
  Shadow = 'SHADOW'
}

export type WaterfallProviderResult = {
  __typename?: 'WaterfallProviderResult';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  result?: Maybe<Scalars['JsonObject']['output']>;
  workflowId?: Maybe<Scalars['ID']['output']>;
};

export type WorkflowMutations = {
  __typename?: 'WorkflowMutations';
  /** Created a record of Waterfall Provider Results. */
  createProviderResult: CreateProviderResultResponse;
  /** Create a waterfall result. */
  createWaterfallResult?: Maybe<IvWaterfallResult>;
  /** Delete a waterfall result. */
  deleteWaterfallResult?: Maybe<DeleteWaterfallResultResponse>;
  /** Executes a verification request for a given workflow. */
  runIncomeVerification?: Maybe<Verification>;
  /** Initiates a waterfall workflow. */
  runIvWaterfall: IvWaterfallResponse;
  /** Submit Finicity VOIA report. */
  submitFinicityReport: SubmitFinicityReportResponse;
  /** Terminate a waterfall workflow. */
  terminateIvWaterfall: TerminateIvWaterfallResponse;
  /** Update a waterfall result. */
  updateWaterfallResult?: Maybe<IvWaterfallResult>;
  /** Update a waterfall workflow status. */
  updateWorkflowStatus: UpdateWorkflowStatusResponse;
};


export type WorkflowMutationsCreateProviderResultArgs = {
  input: CreateProviderResultInput;
};


export type WorkflowMutationsCreateWaterfallResultArgs = {
  input: IvWaterfallResultInput;
};


export type WorkflowMutationsDeleteWaterfallResultArgs = {
  workflowId: Scalars['ID']['input'];
};


export type WorkflowMutationsRunIncomeVerificationArgs = {
  input: RunWorkflowIncomeVerificationInput;
  options?: InputMaybe<RunIncomeVerificationOptionsInput>;
};


export type WorkflowMutationsRunIvWaterfallArgs = {
  input: IvWaterfallInput;
};


export type WorkflowMutationsSubmitFinicityReportArgs = {
  input?: InputMaybe<SubmitFinicityReportInput>;
};


export type WorkflowMutationsTerminateIvWaterfallArgs = {
  input?: InputMaybe<TerminateIvWaterfallInput>;
};


export type WorkflowMutationsUpdateWaterfallResultArgs = {
  input: IvWaterfallResultUpdateInput;
};


export type WorkflowMutationsUpdateWorkflowStatusArgs = {
  input: UpdateWorkflowStatusInput;
};

export type WorkflowQueries = {
  __typename?: 'WorkflowQueries';
  /** Gets the state of a given provider's verification request. If there are multiple requests, then only the most recent will be returned. */
  incomeVerification?: Maybe<Verification>;
  /** Gets all verification requests executed for a given workflow. */
  incomeVerifications?: Maybe<Array<Maybe<Verification>>>;
  /** Search workflows */
  search?: Maybe<IvWorkflowSearchResponse>;
  /** Gets the income verification state of the workflow. */
  state?: Maybe<IvState>;
  /** Gets the result of an IV provider in a waterfall run. */
  waterfallProviderResults?: Maybe<Array<Maybe<WaterfallProviderResult>>>;
  /** Gets the result for a IV Waterfall workflow. */
  waterfallResult?: Maybe<IvWaterfallResult>;
  /** Gets the current state of an IV waterfall workflow. */
  waterfallWorkflow?: Maybe<IvWaterfallWorkflow>;
};


export type WorkflowQueriesIncomeVerificationArgs = {
  provider?: InputMaybe<VerificationProvider>;
  workflowId: Scalars['ID']['input'];
};


export type WorkflowQueriesIncomeVerificationsArgs = {
  workflowId: Scalars['ID']['input'];
};


export type WorkflowQueriesSearchArgs = {
  input?: InputMaybe<IvWorkflowSearchInput>;
};


export type WorkflowQueriesStateArgs = {
  uniqueTrackingCode: Scalars['ID']['input'];
};


export type WorkflowQueriesWaterfallProviderResultsArgs = {
  workflowId: Scalars['ID']['input'];
};


export type WorkflowQueriesWaterfallResultArgs = {
  workflowId: Scalars['ID']['input'];
};


export type WorkflowQueriesWaterfallWorkflowArgs = {
  workflowId: Scalars['ID']['input'];
};
