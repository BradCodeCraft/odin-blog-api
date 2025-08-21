import { useEffect, useState } from "react";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    try {
      if (localStorage.length > 0) {
        setUser(JSON.parse(localStorage.user));
        setToken("" + localStorage.token);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <NavigationBar user={user} setUser={setUser} />

      <Outlet
        context={{
          user: user,
          setUser: setUser,
          token: token,
          setToken: setToken,
        }}
      />
    </>
  );
}
