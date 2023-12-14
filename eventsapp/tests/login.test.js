import React from "react";
import {
  render,
  fireEvent,
  queryByText,
  screen,
} from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";

import Login from "../pages/login/login";

const mockStore = configureStore([]);

test("inavlid emai;", () => {
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

test("inavlid email;", () => {
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

test("valid password length", () => {
  const store = mockStore({});

  const { getByPlaceholderText, queryByText } = render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  const passwordInput = getByPlaceholderText("password");

  // Test valid password length
  fireEvent.changeText(passwordInput, "password123");
  expect(queryByText("Password is invalid")).toBeFalsy();
});

test("render forgot password link", () => {
  const store = mockStore({});

  const { getByText } = render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  const forgotPasswordLink = getByText("Forgot password?");

  // Assert that the "Forgot password?" link is rendered
  expect(forgotPasswordLink).toBeTruthy();
});
