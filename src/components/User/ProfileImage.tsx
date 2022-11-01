import {getUserProfilePicture} from "../../services/utils/SlResolver";
import {UserProfile} from "../../models/UserProfile";
import useSWR from "swr";
import {useEffect} from "react";
import ImgSl from "../Images/ImgSl";

export interface ProfileImageProps {
    userProfile: UserProfile
}

const profileImageFetcher = (profileUuid: string) => getUserProfilePicture(profileUuid).then((res) => res)

export default function ProfileImage({userProfile}: ProfileImageProps) {
    const {data: imageResponse, error, isValidating} = useSWR(userProfile.uuid, profileImageFetcher)

    useEffect(() => {
        if (imageResponse) {
            if (userProfile.pictureUuid !== imageResponse.imageUuid) {
                userProfile.pictureUuid = imageResponse.imageUuid
            }
        }
    }, [imageResponse])

    return (
        <>
            {/*{(!profileImageData.error && profileImageData.data) &&*/}
            <ImgSl uuid={imageResponse?.imageUuid ?? userProfile.pictureUuid} width={'50px'} height={'50px'}
                   radius={'lg'}/>
        </>
    );
}
