import Sidebar from "./tools/sidebar";

export default function Home() {
  return (
    <div className="page-container">
      <Sidebar/>
      <div className="main-content">
        <h1>Welcome to Budgy</h1>
        <p>Your Ready To Get Started</p>
      </div>
    </div>
  );
}