// public async getBiggerResTexture(uuid: string): Promise<string> {
//
//     let url = await firstValueFrom(
//         this.http
//             .get<ImageResponseDto>('https://slimage.allomancy.net/imagestore/' + uuid)
//             .pipe(
//                 map(r => r.url),
//                 catchError(() => {
//                     return of(this.getTextureUuidUrl(uuid));
//                 }),
//                 first(),
//             )
//     );
//
//     return url ?? this.getTextureUuidUrl(uuid);
//
//     /*
//     .subscribe({
//           next: (result) => {
//             // console.log('response: ' + result.url);
//             url = result.url;
//           },
//           error: (err) => {
//             // console.log('err: ', err);
//             url = this.getTextureUuidUrl(uuid);
//           }
//         });
//      */
//     // return this.getTextureUuidUrl(uuid);
// }
//
// public getTextureUuidUrl(uuid: string): string {
//     return `https://picture-service.secondlife.com/${uuid}/320x240.png`;
// }
import axios from "axios";
import {ImageResponseDto} from "./models/ImageResponseDto";
import {NULL_KEY} from "../../constants/StringConstants";

// const noImage = 'https://stores.allomancy.com/assets/noimage.png';

function isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
}

function bypassCorsOnDevelopment(url: string): string {
    // if (isDevelopment()) return `https://cors-anywhere.herokuapp.com/${url}/`;
    return url;
}

export async function getBiggerResTexture(uuid: string): Promise<string> {

    try {
        const result = await axios.get<ImageResponseDto>(bypassCorsOnDevelopment('https://slimage.allomancy.net/imagestore/' + uuid));
        return result.data.url ?? gettextureUuidSlUrl(uuid);
    } catch (e) {
        return gettextureUuidSlUrl(uuid);
    }

}

export async function getUserProfilePicture(userUuid: string): Promise<ImageResponseDto | null> {
    try {
        const result = await axios.get<ImageResponseDto>(bypassCorsOnDevelopment('https://slimage.allomancy.net/profileimage/' + userUuid));
        return result.data ?? null;
    } catch (e) {
        return null;
    }
}


export function gettextureUuidSlUrl(uuid: string): string {
    return `https://picture-service.secondlife.com/${uuid}/320x240.png`;
}

//
// public getAvatarUrl(username: string): string {
//     return `https://my.secondlife.com/${username}`;
// }
function getAvatarSlUrl(username: string): string {
    return `https://my.secondlife.com/${username}`;
}

//
// public getRegionUrl(region: string, position: string): string {
//     //  http://maps.secondlife.com/secondlife/Samurai/90/220/4001
//     return `http://maps.secondlife.com/secondlife/${region}/${position.replace(/\,/g, '/')}`;
// }
function getRegionSlUrl(region: string, position: string): string {
    //  http://maps.secondlife.com/secondlife/Samurai/90/220/4001
    return `http://maps.secondlife.com/secondlife/${region}/${position.replace(/\,/g, '/')}`;
}

export function NullKeyToNull(key?: string): string | null {
    if (key) {
        if (key === NULL_KEY) {
            return null;
        }
        return key;
    }
    return null;
}

