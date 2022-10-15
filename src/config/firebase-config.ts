import admin from 'firebase-admin';

import * as fs from 'fs';
import * as path from 'path';

const serviceAccount = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, './firebase-service-account.json'), {
    encoding: 'utf8',
  }),
);

const app = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
    projectId: serviceAccount.project_id,
  }),
  projectId: 'frellance-marketplace',
  storageBucket: 'frellance-marketplace.appspot.com',
});

const auth = admin.auth(app);
const storage = admin.storage(app).bucket();

export default { auth, storage };
