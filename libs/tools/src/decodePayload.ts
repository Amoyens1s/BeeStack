import { decode } from 'js-base64';
import { Payload } from './interface';

export function decodePayload(payload: string) {
  return <Payload>JSON.parse(decode(payload));
}
