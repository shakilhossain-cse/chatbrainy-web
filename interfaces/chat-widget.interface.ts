// interfaces/chat-widget.interface.ts
export interface IChatWidget {
  id?: string;
  name: string;
  description?: string;
  website_url: string;
  primary_color: string;
  secondary_color: string;
  icon?: string | File;
  message?: string;
}
