import './App.css'
import Footer from './components/footer'
import Header from './components/header'
import Main from './components/main'

function App() {
  

  return (
    <div className="min-h-screen transition-all duration-1000 bg-linear-to-br from-start via-med to-end pt-10" >
     <Header />
     <Main />
     <Footer />
    </div>
  )
}

export default App;