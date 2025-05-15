import './App.css';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';

function App() {
  return (
    <div>
      <Input placeholder="example@address.com" />
      <Button>Subscribe</Button>
      <div>
        <p>Frequency</p>
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Daily</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Hourly</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default App;
