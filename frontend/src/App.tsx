import './App.css';
import sunCloudsImg from './assets/sun_clouds.png';
import { SubscriptionForm } from './components/subscription-form';

function App() {
  return (
    <div className="max-w-xl m-auto">
      <div className="gap-4 flex flex-col items-center mb-5">
        <img
          width={200}
          src={sunCloudsImg}
          alt="sun clouds"
          className="inline-block"
        />
        <h1 className="text-3xl font-bold text-white mb-2">
          Your Daily Weather
          <br /> at a Glance
        </h1>
        <p className="text-white font-light">
          Subscribe to daily or hourly weather updates for your city. Just enter
          your email, choose how often you want updates, and stay informed with
          real-time forecasts — straight to your inbox ✉️
        </p>
      </div>
      <SubscriptionForm />
    </div>
  );
}

export default App;
