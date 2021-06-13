import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom"
import Header from "./components/Header";
import PizzaList from "./components/Pizza/PizzaList";
import AddPizza from "./components/Pizza/AddPizza";
import ViewPizza from "./components/Pizza/ViewPizza";
import PizzaSizeList from "./components/PizzaSize/PizzaSizeList";
import AddPizzaSize from "./components/PizzaSize/AddPizzaSize";
import ViewPizzaSize from "./components/PizzaSize/ViewPizzaSize";
import ViewSizeListForPizza from "./components/PizaSizeMapping/ViewSizeListForPizza";
import ViewSizeForPizza from "./components/PizaSizeMapping/ViewSizeForPizza";

function App() {
  return (
    <Router>
        <div>
            <Header/>
            <Route path="/pizzas/:id/size/:id" exact component={ViewSizeForPizza} />
            <Route path="/pizzas/:id/sizes" exact component={ViewSizeListForPizza} />
            <Route path="/sizes/view/:id" exact component={ViewPizzaSize} />
            <Route path="/sizes/add" exact component={AddPizzaSize} />
            <Route path="/sizes" exact component={PizzaSizeList} />
            <Route path="/pizzas/update/:id" exact component={ViewPizza} />
            <Route path="/pizzas/add" exact component={AddPizza} />
            <Route path="/" exact component={PizzaList} />
        </div>
    </Router>
  );
}

export default App;
