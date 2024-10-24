import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { useSwitch } from "@/hooks/switch";
import { Switch } from "@/components/ui/switch";
import { GamesAPI } from "@/api/games";
import { Form } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";

export function CreatePage() {
  const navigate = useNavigate();
  const enablePassword = useSwitch();
  const enableHostRotate = useSwitch();
  const submit = useCallback(
    async (formData: FormData) => {
      const name = formData.get("name") as string;
      const password = (formData.get("password") as string) ?? "";
      const newGame = await GamesAPI.create({
        name,
        hostRotate: enableHostRotate.active,
        password,
      });
      if (!newGame) {
        navigate("/");
        return;
      }
      navigate(`/games/${newGame.id}`);
    },
    [navigate, enableHostRotate.active]
  );
  return (
    <main>
      <h2 className="text-2xl font-medium flex items-center justify-between gap-4 flex-wrap mb-4">
        Create Game
      </h2>
      <Form submit={submit} buttonText="Create">
        <Input
          placeholder="Name"
          name="name"
          id="name"
          required
          minLength={2}
        />
        <div className="flex items-center justify-between gap-4">
          <p className="text-lg font-medium">Set Password</p>
          <Switch {...enablePassword} />
        </div>
        {enablePassword.active ? (
          <Input
            placeholder="Password"
            name="password"
            id="password"
            required
          />
        ) : null}
        <div className="flex items-center justify-between gap-4">
          <p className="text-lg font-medium">Enable Host Rotate</p>
          <Switch {...enableHostRotate} />
        </div>
        {enableHostRotate.active ? (
          <p className="text-sm text-zinc-500">
            <span className="text-amber-500">Note:</span> Once activated it is
            not possible to reverse it. You will have to create a new room if
            you do not want to continue using it.
          </p>
        ) : null}
      </Form>
    </main>
  );
}
