import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
} from './authSlice';

const mockApiCall = (url, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate API response
      if (data.email === 'test@example.com' && data.password === 'password') {
        resolve({
          user: {
            id: 1,
            email: data.email,
            name: 'Test User',
          },
          token: 'mock-jwt-token-12345',
        });
      } else if (url.includes('signup')) {
        resolve({
          user: {
            id: 2,
            email: data.email,
            name: data.name || 'New User',
          },
          token: 'mock-jwt-token-signup-67890',
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};
function* signInSaga(action) {
  try {
    const { email, password } = action.payload;
    const response = yield call(mockApiCall, '/api/auth/signin', { email, password });
    yield put(signInSuccess(response));
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}
function* signUpSaga(action) {
  try {
    const { name, email, password } = action.payload;
    const response = yield call(mockApiCall, '/api/auth/signup', { name, email, password });
    yield put(signUpSuccess(response));
  } catch (error) {
    yield put(signUpFailure(error.message));
  }
}
export function* authSaga() {
  yield takeLatest(signInStart.type, signInSaga);
  yield takeLatest(signUpStart.type, signUpSaga);
}
