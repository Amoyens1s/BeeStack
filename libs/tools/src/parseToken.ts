import { decode } from 'js-base64';
import { Payload } from './interface';

export function parseToken(token: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [header, payloads, signature] = token.split('.');
  const payload = JSON.parse(decode(payloads));
  payload.exp *= 1000;
  return <Payload>payload;
}
