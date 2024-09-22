import MainPage from '../../pages/main-page/main-page';

type AppScreenProps = {
  offersNumber: number;
}

function App({offersNumber} : AppScreenProps) : JSX.Element {
  return (
    <MainPage
      offersNumber={offersNumber}
    />
  );
}

export default App;
