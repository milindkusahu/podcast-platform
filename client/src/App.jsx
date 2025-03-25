import Button from "./components/common/Button/Button";
import Welcome from "./pages/Welcome/Welcome";
import { WhiteLogo } from "./utils/icons";

function App() {
  return (
    <>
      {/* <Button
        icon={<WhiteLogo width={59} height={59} />}
        bgColor="#ff0000"
        textColor="#dadce0"
        strokeColor="#dadce0"
      >
        Sign in with Google
      </Button> */}
      <Welcome />
    </>
  );
}

export default App;
