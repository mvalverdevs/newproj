/* tslint:disable:max-line-length */

export interface LoggedAction {
  id?: number;
  /**
   * Creation datetime of the operation.
   * format: date-time
   */
  creation_datetime: string;
  /** System on which the operation depends. */
  system?: string;
  /** Subsystem on which the operation depends. */
  subsystem?: string;
  /** Identification of the affected object */
  log_id?: string;
  /** Action. */
  action?: string;
  /** Description of the action executed. */
  description: string;
  /** URL called for the execution of the action. */
  url: string;
  /** GET parameters received by the server. */
  http_get_parameters?: string;
  /** POST parameters received by the server. */
  http_post_parameters?: string;
  /** HTTP method. */
  http_method?: Http_methodLoggedActionEnum;
  /** User agent that sends the browser to the server. */
  http_user_agent: string;
  /** IP address of the client that executes this action. */
  ip?: string;
  /** User who has made the operation. */
  executor_user?: number;
  /** Extra data */
  extra?: string;
  /** Action taken by personnel of the application */
  is_staff?: boolean;
  /** Response of the action */
  response?: string;
  /** HTTP response status */
  status_code?: string;
}

export type Http_methodLoggedActionEnum =
  'GET' |
  'HEAD' |
  'POST' |
  'PUT' |
  'DELETE';
