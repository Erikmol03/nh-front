import { Dayjs } from "dayjs";

export interface FormStateEdit {
  id_onboarding?: number;
  first_name: string;
  last_name: string;
  email: string;
  date_entry: Dayjs | null;
  date_technical_onboarding: Dayjs | null;
}
