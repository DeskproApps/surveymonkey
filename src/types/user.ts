export interface User {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  language: string;
  email: string;
  email_verified: boolean;
  account_type: string;
  date_created: string; // "2023-04-14T12:32:00+00:00",
  date_last_login: string; // "2024-05-10T09:31:39.173000+00:00",
  question_types: {
    comment_box_question_type: boolean,
    file_upload_question_type: boolean;
    matrix_question_type: boolean;
    ranking_question_type: boolean;
    rating_question_type: boolean;
    slider_question_type: boolean;
    star_rating_question_type: boolean;
    textbox_multiple_question_type: boolean;
    video_question_type: boolean;
  },
  scopes: {
    granted: string[];
    available: string[];
  };
  sso_connections: [];
  features: {
    collector_create_limit: number;
    collector_email_enabled: boolean;
    collector_thank_you_enabled: boolean;
    create_question_limit: number;
    num_free_responses: number;
  };
  href: string;
}
