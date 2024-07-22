export interface ITeacherCreate {
  fullname: string;
  email: string;
  country: string;
  gender: string;
  nick_name: string;
  university?: string;
  dob: string;
  languages: { label: string; value: string }[] | any;
}
