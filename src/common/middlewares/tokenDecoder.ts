import { BadRequestException, UnauthorizedException } from '@nestjs/common';

import firebaseConfig from 'src/config/firebase-config';

import { FirebaseUserDto } from 'src/dtos/firebase-user.dto';

export async function tokenDecoder(token: string): Promise<FirebaseUserDto> {
  try {
    const decodeValue = await firebaseConfig.auth.verifyIdToken(token);

    const user: FirebaseUserDto = {
      email: decodeValue.email,
      uid: decodeValue.uid,
      sign_in_provider: decodeValue.firebase.sign_in_provider,
      name: decodeValue.name,
      picture: decodeValue.picture,
    };

    if (decodeValue) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Un Authorizated' });
  } catch (err) {
    console.log(err);
    throw new BadRequestException(err);
  }
}
