export interface ITeacherCreate {
  fullname: string;
  email: string;
  country: string;
  gender: string;
  nickname: string;
  university?: string;
  dob: string;
  languages: { label: string; value: string }[] | any;
}
