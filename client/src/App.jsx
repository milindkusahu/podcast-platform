import Button from "./components/common/Button/Button";
import { PremiumIcon } from "./utils/icons";

function App() {
  return (
    <>
      <Button
        icon={<PremiumIcon width={18} height={18} />}
        bgColor="#ff0000"
        textColor="#dadce0"
        strokeColor="#dadce0"
      >
        Sign in with Google
      </Button>
    </>
  );
}

export default App;
