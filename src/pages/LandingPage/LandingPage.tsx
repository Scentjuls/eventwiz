import React from "react";
import { Header } from "../../components/Header/Header";
import { Events } from "../../components/Events/Events";
import { ErrorBoundary } from "../../components/ErrorBoundary/ErrorBoundary";

export const LandingPage = () => {
  return (
    <ErrorBoundary>
      <Header />
      <Events />
    </ErrorBoundary>
  );
};
