import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';
import { stringify } from 'querystring';



export function baseUrl(concat: string): string {
    return "https://20122022avionspringv1-production.up.railway.app" + concat;
}
// export async function baseUrl(concat: string): Promise<string> {
//     return new Promise((resolve, reject) => {
//         resolve(`http://localhost:8080${concat}`);
//     });
// }