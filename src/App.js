import './App.css';
import SideBar from './Components/SideBar'
import Feed from "./Components/Feed";
import Widgets from './Components/Widgets'

function App() {
  return (
    <div className="app">
      <SideBar />
      <Feed />
      <Widgets />
    </div>
  );
}

export default App;
