export interface BloggerProfilePutDto {
  description: string;
  available?: boolean;
  notify?: boolean;
  socialLinks: string[];
}
