export interface Attachment {
  file_path: string;
}

export interface User {
  name: string;
  attachment?: Attachment;
}

export interface NotificationType {
  id: number;
  tiitle: string;
  notificationType: string;
  createdByUser: User;
}
