enum FileType {
  JPG = 'JPG',
  PNG = 'PNG',
  JPEG = 'JPEG',
  SVG = 'SVG',
  PDF = 'PDF',
}

export enum IUSER_ROLE {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export interface IAttachments {
  id: number;
  type?: FileType;
  file_name: string;
  file_size?: number;
  file_type?: string;
  file_path?: string;
  owner_id?: number;
  encrypted_flag: boolean;
  created_at: Date;
  updated_at: Date;
  upload_type?: string;
}
