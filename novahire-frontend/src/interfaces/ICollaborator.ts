export interface CollaboratorAttributes {
  id_collaborator: number;
  id_onboarding: number;
  first_name: string;
  last_name: string;
  email: string;
  date_entry: Date;
  state_welcome_onboarding: boolean;
  state_technical_onboarding: boolean;
  type_technical_onboarding: string;
  date_technical_onboarding?: Date;
}
