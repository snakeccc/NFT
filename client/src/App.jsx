import Install from '../components/Install';
import Home from '../components/Home';
import ShowURL from '../components/ShowURL';
function App() {

  if (window.ethereum) {
    return <ShowURL />;
  } else {
    return <Install />
  }
}

export default App;