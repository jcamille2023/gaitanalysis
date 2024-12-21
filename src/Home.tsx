import { Provider } from './components/ui/provider'
import { Link } from './Button'
import './App.css'

function Home() {
  return (
    <div className='box'>
      <h1>Gait Analysis using 3D Human Pose Estimation</h1>
      <Provider>
        <Link href="rcv">Get started</Link>
      </Provider>
    </div>
  )
}

export default Home
