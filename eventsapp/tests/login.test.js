import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import * as userService from '../services/userSevice';
import Login from "../pages/login/login";

const mockStore = configureStore([]);
jest.mock('../services/userSevice', () => ({
  LoginUser: jest.fn(),
}));

const store = mockStore({});
test("Valid email", () => {
  const store = mockStore({});

  const { getByPlaceholderText, getByText } = render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  const emailInput = getByPlaceholderText("email");

  // Test valid email
  fireEvent.changeText(emailInput, "validemail@example.com");
  expect(screen.queryByText("Email is invalid")).toBeFalsy();
});

test("Invalid email;", () => {
  const store = mockStore({});

  const { getByPlaceholderText, getByText } = render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  const emailInput = getByPlaceholderText("email");
  fireEvent.changeText(emailInput, "invalid");
  expect(screen.queryByText("Email is invalid")).toBeTruthy();
});

test("Valid password length", () => {
  const store = mockStore({});

  const { getByPlaceholderText, queryByText } = render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  const passwordInput = getByPlaceholderText("password");

  fireEvent.changeText(passwordInput, "Password123@");
  expect(queryByText("Password is invalid")).toBeFalsy();
});

test("Invalid password length", () => {
  const store = mockStore({});

  const { getByPlaceholderText, queryByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
  );

  const passwordInput = getByPlaceholderText("password");

  fireEvent.changeText(passwordInput, "Pass");
  expect(queryByText("Password is invalid")).toBeFalsy();
});

describe('Login Component', () => {
  it('saves user token correctly upon successful login', async () => {
    const token = 'mocked-token';
    userService.LoginUser.mockResolvedValue(token);

    const { getByPlaceholderText, getByText } = render(
        <Provider store={store}>
          <Login />
        </Provider>
    );

    const emailInput = getByPlaceholderText('email');
    const passwordInput = getByPlaceholderText('password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'validPassword123');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const actions = store.getActions();
      const setTokenAction = actions.find(action => action.type === 'user/setToken');
      expect(setTokenAction).toBeDefined();
      expect(setTokenAction.payload).toEqual(token);
    });
  });

});


