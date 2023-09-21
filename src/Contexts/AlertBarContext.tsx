import { PropsWithChildren, createContext, useContext, useState } from "react";

type IsAlertType = "success" | "error" | "";

type AlertContextType = {
  isAlert: IsAlertType;
  isAlertMessage: string;
  showAlertAvailable: (type: IsAlertType, message: string) => void;
};

export const AlertBarContext = createContext<AlertContextType>({
  isAlert: "",
  isAlertMessage: "",
  showAlertAvailable: () => {},
});

export const useAlertBar = () => {
  const context = useContext(AlertBarContext);
  if (!context) {
    throw new Error("useAlertBar must be used within an AlertBarProvider");
  }
  return context;
};

const AlertBarProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props;
  const [isAlert, setIsAlert] = useState<IsAlertType>("");
  const [isAlertMessage, setIsAlertMessage] = useState<string>("");

  const showAlertAvailable = (type: IsAlertType, message: string) => {
    setIsAlert(type);
    setIsAlertMessage(message);
  };

  const value: AlertContextType = {
    isAlert,
    isAlertMessage,
    showAlertAvailable,
  };

  return (
    <AlertBarContext.Provider value={value}>
      {children}
    </AlertBarContext.Provider>
  );
};

export default AlertBarProvider;
