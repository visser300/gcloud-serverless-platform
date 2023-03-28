import * as admin from 'firebase-admin'
import * as fireorm from 'fireorm'

if (admin.apps.length === 0) {
  admin.initializeApp()
  const firestore = admin.firestore()
  firestore.settings({ ignoreUndefinedProperties: true })
  fireorm.initialize(firestore, {
    validateModels: true,
  })
}

export const getApp = () => {
  return admin.app()
}

export const getFirestore = () => {
  return getApp().firestore()
}
