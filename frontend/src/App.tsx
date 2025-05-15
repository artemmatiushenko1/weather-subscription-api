import './App.css';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import sunCloudsImg from './assets/sun_clouds.png';

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
      <form className="flex flex-col gap-5">
        <div>
          <Label className="mb-2">Enter your city</Label>
          <Input placeholder="e.g. Kyiv" />
        </div>
        <div>
          <Label className="mb-2">
            How often would you like to receive weather updates?
          </Label>
          <RadioGroup defaultValue="comfortable" className="flex flex-row">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1" className="text-white">
                Daily
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2" className="text-white">
                Hourly
              </Label>
            </div>
          </RadioGroup>
        </div>
        <div className="flex gap-4">
          <Input placeholder="example@address.com" />
          <Button type="submit">Subscribe</Button>
        </div>
      </form>
      <p className="mt-5">
        Thanks for subscribing! ❤️ <br />
        Please check your email to confirm your subscription.
      </p>
    </div>
  );
}

export default App;
