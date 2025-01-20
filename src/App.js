import './App.css';

const App = () => {
  return (
      <div className="app-container bg-gray-50">
        <header className="p-4 bg-blue-500 text-white text-center">
          <h1 className="text-xl font-bold">My Web App</h1>
        </header>
        <main className="flex-1 p-4 overflow-auto">
          <p>이곳에 앱 내용을 작성하세요!</p>
        </main>
        <footer className="p-4 bg-blue-500 text-white text-center">
          <p>© 2025 My Web App</p>
        </footer>
      </div>
  );
};

export default App;
