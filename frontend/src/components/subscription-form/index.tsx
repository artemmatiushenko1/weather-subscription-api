import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const SubscriptionForm = () => {
  return (
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
  );
};

export { SubscriptionForm };
