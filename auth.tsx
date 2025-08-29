import { useEffect } from "react";
import { NativeModules, NativeEventEmitter } from "react-native";

const { RNtdlib } = NativeModules;
const tdEmitter = new NativeEventEmitter(RNtdlib);

export default function App() {
  useEffect(() => {
    RNtdlib.createClient({ apiId: 123456, apiHash: "your_api_hash" });

    // слушаем события авторизации
    const sub = tdEmitter.addListener("updateAuthorizationState", (event) => {
      console.log("Auth state:", event);
      if (event.authorization_state === "authorizationStateWaitPhoneNumber") {
        RNtdlib.send({
          "@type": "setAuthenticationPhoneNumber",
          phone_number: "+79991234567",
        });
      }
    });

    return () => sub.remove();
  }, []);

  return null;
}