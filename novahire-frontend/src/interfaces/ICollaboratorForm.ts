import { Dayjs } from "dayjs";

export interface FormState {
  id_onboarding?: number;
  first_name: string;
  last_name: string;
  email: string;
  date_entry: Dayjs | null;
  type_technical_onboarding: string;
  date_technical_onboarding: Dayjs | null;
}
