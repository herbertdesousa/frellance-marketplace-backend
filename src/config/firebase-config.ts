import admin from 'firebase-admin';

// import serviceAccount from './firebase-service-account.json';

import * as fs from 'fs';
import * as path from 'path';

const serviceAccount = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './firebase-service-account.json'), {
    encoding: 'utf8',
  }),
);

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
    projectId: serviceAccount.project_id,
  }),
});

export default admin;
