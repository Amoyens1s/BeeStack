import { encode } from 'js-base64';
import { Payload } from './interface';

export function encodePayload(payload: Payload) {
  return encode(JSON.stringify(payload));
}
