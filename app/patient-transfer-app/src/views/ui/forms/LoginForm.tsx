import {Button, Card, Input, Stack} from "@chakra-ui/react";
import {ChangeEvent, FormEvent, useCallback} from "react";

export interface LoginFormProps {
  username: string;
  password: string;
  // eslint-disable-next-line no-unused-vars
  onUsernameChange?: (username: string) => void;
  // eslint-disable-next-line no-unused-vars
  onPasswordChange?: (password: string) => void;
  onSubmit?: () => void;
  onCancel?: () => void;
}

export function LoginForm (props: LoginFormProps) {
  const {username, password, onUsernameChange, onPasswordChange, onSubmit, onCancel} = props;

  const handleUsernameChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onUsernameChange?.(event.target.value),
    [onUsernameChange]
  );

  const handlePasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onPasswordChange?.(event.target.value),
    [onPasswordChange]
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onSubmit?.();
    },
    [onSubmit]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card.Root maxW="sm" border="solid 1px gray">
        <Card.Header>
          <Card.Title>Autenticação</Card.Title>
          <Card.Description>
            Entre com seus dados de acesso
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Input placeholder="Usuário..." value={username} onChange={handleUsernameChange} />
            <Input placeholder="Senha..." type="password" value={password} onChange={handlePasswordChange} />
          </Stack>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button variant="outline" type="reset" onClick={onCancel}>Cancelar</Button>
          <Button variant="solid" type="submit">Autenticar</Button>
        </Card.Footer>
      </Card.Root>
    </form>
  );
}
