// imports all css for repective pages
import "./styling/home.css";
import "./styling/advisor.css";
import "./styling/map.css";
import "./styling/sidebar.css";
import "./styling/tracker.css";


export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}