export interface ICollector {
  name: string;
  id: string;
  href: string;
  type: string;
}
export interface ICollectorWithDetails {
  status: string;
  id: string;
  survey_id: string;
  type: string;
  name: string;
  thank_you_message: string;
  thank_you_page: ThankYouPage;
  disqualification_type: string;
  disqualification_message: string;
  disqualification_url: string;
  closed_page_message: string;
  redirect_type: string;
  redirect_url: string;
  display_survey_results: boolean;
  edit_response_type: string;
  anonymous_type: string;
  allow_multiple_responses: boolean;
  date_modified: string;
  date_created: string;
  response_count: number;
  password_enabled: boolean;
  response_limit: null;
  respondent_authentication: boolean;
  sender_email: null;
  close_date: null;
  url: string;
  href: string;
  parentId: string;
}

export interface ThankYouPage {
  is_enabled: boolean;
  message: string;
}
