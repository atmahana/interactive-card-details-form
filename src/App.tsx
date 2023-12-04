import BackCard from "./components/cards/BackCard";
import FrontCard from "./components/cards/FrontCard";
import InputFormGroup from "./components/Form";
import Success from "./components/Success";
import { useFormContext } from "./hooks/FormContext";

let renderCount = 0;

function App() {
  renderCount++;
  const { state } = useFormContext();

  return (
    <main className="h-screen flex flex-col md:flex-row md:justify-between">
      <div className="bg-main-mobile md:bg-main-desktop bg-no-repeat md:min-w-[30rem] outline">
        <BackCard />
        <FrontCard />
      </div>
      <div className="grid place-content-center px-[12.5em] ml-[8rem]">{state.isSucceed === true ? <Success /> : <InputFormGroup />}</div>
    </main>
  );
}

export default App;
