import {User} from "@app/domain/auth";
import {useLoginStore, useUserStore} from "@app/views/hooks";
import {LoginForm} from "@app/views/ui/forms";
import {CenteredVStack} from "@app/views/ui/layout";
import {Navigate} from "react-router";

export function LoginPage () {
  const {user, isAuthenticated} = useUserStore();
  const login = useLoginStore();

  return <>
    <CenteredVStack>
      <LoginForm
        username={login.username.value}
        password={login.password.value}
        onUsernameChange={login.setUsername}
        onPasswordChange={login.setPassword}
        onSubmit={login.login}
        onCancel={login.clear}
      />
    </CenteredVStack>

    {isAuthenticated.value && <Navigate to={getHomePageUrl(user.value)} replace />}
  </>;
}

function getHomePageUrl (user: User) {
  switch (user.kind) {
    case "user":
      return "/doctor";

    default:
      return "/";
  }
}
