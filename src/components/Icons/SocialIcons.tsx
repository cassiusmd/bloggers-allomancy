import {
    IconBrandBlogger,
    IconBrandFacebook,
    IconBrandFlickr,
    IconBrandInstagram,
    IconBrandTiktok,
    IconBrandTumblr,
    IconBrandTwitter,
    IconBrandWix,
    IconBrandWordpress,
    IconLink
} from "@tabler/icons";


export interface SocialIconProps {
    link: string;
}

/*
if (this.link.includes('flickr') || this.link.includes('flic.kr')) {
      prefix = 'fab';
      icon = 'flickr';
      this.linkName = 'Flickr';
    } else if (this.link.includes('wordpress')) {
      prefix = 'fab';
      icon = 'wordpress';
      this.linkName = 'WordPress';
    } else if (this.link.includes('instagram')) {
      prefix = 'fab';
      icon = 'instagram';
      this.linkName = 'Instagram';
    } else if (this.link.includes('facebook')) {
      prefix = 'fab';
      icon = 'facebook';
      this.linkName = 'Facebook';
    } else if (this.link.includes('wixsite')) {
      prefix = 'fab';
      icon = 'wix';
      this.linkName = 'Wix';
    } else if (this.link.includes('tiktok')) {
      prefix = 'fab';
      icon = 'tiktok';
      this.linkName = 'TikTok';
    } else if (this.link.includes('blogger') || this.link.includes('blogspot')) {
      prefix = 'fab';
      icon = 'blogger';
      this.linkName = 'Blogger';
    } else if (this.link.includes('twitter')) {
      prefix = 'fab';
      icon = 'twitter';
      this.linkName = 'Twitter';
    } else if (this.link.includes('tumblr')) {
      prefix = 'fab';
      icon = 'tumblr';
      this.linkName = 'Tumblr';
    } else {
      this.linkName = this.link;
    }
 */
function getSocialLink(link: string, fontSize = '1.25rem') {
    // console.log(link);
    if (link.includes('flickr') || link.includes('flic.kr')) {
        return <IconBrandFlickr fontSize={fontSize}/>;
    } else if (link.includes('wordpress')) {
        return <IconBrandWordpress fontSize={fontSize}/>;
    } else if (link.includes('instagram')) {
        return <IconBrandInstagram fontSize={fontSize}/>;
    } else if (link.includes('facebook')) {
        return <IconBrandFacebook fontSize={fontSize}/>;
    } else if (link.includes('blogger') || link.includes('blogspot')) {
        return <IconBrandBlogger fontSize={fontSize}/>;
    } else if (link.includes('wixsite')) {
        return <IconBrandWix fontSize={fontSize}/>;
    } else if (link.includes('tiktok')) {
        return <IconBrandTiktok fontSize={fontSize}/>;
    } else if (link.includes('twitter')) {
        return <IconBrandTwitter fontSize={fontSize}/>;
    } else if (link.includes('tumblr')) {
        return <IconBrandTumblr fontSize={fontSize}/>;
    }

    return <IconLink fontSize={fontSize}/>;
}

const SocialIcon = ({link}: SocialIconProps) => {
    return <>{getSocialLink(link)}</>;
};

export default SocialIcon;
