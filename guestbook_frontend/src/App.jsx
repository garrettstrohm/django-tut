import './styles/main.css'

const App = () => {
  return (
    <div>
      <div className="header">
        <div className="logo">
          <p className="title">Guest Book</p>
        </div>
        <div className="add-section">
          <a className="add-btn" href='#'>Add Note</a>
        </div>
      </div>
    </div>
  );
}

export default App;
