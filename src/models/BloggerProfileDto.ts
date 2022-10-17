export interface BloggerProfileDto {
  description?: string;
  available: boolean;
  notify: boolean;
  socialLinks: string[];

  id: string;
  profileId: string;
}
