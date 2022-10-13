import { Button, Group } from "@mantine/core";
import {ColorSchemeToggle} from "../components/ColorSchemeToggle/ColorSchemeToggle";

export default function IndexPage() {
  return (
      <Group mt={50} position="center">
        <Button size="xl">Welcome to Mantine!</Button>
          <ColorSchemeToggle />
      </Group>
  );
}
