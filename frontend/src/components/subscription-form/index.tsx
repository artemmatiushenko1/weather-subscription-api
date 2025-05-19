import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const SubscriptionForm = () => {
  const handleFormSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (!(form instanceof HTMLFormElement)) return;

    const formData = new FormData(form);
    const email = formData.get('email');
    const frequency = formData.get('frequency');
    const city = formData.get('city');

    if (!email || !frequency || !city) return;

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/subscribe`,
      {
        method: 'POST',
        body: new URLSearchParams({
          email: email.toString().trim().toLowerCase(),
          city: city.toString().trim().toLowerCase(),
          frequency: frequency.toString(),
        }),
      }
    );

    if (response.ok) {
      window.alert(
        'Thanks for subscribing! ❤️ Please check your email to confirm your subscription.'
      );
      window.location.reload();
    } else {
      const error = await response.json();
      window.alert(`Ooops! ${error?.message}.`);
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
      <div>
        <Label className="mb-2">Enter your city</Label>
        <Input placeholder="e.g. Kyiv" name="city" />
      </div>
      <div>
        <Label className="mb-2">
          How often would you like to receive weather updates?
        </Label>
        <RadioGroup
          defaultValue="daily"
          className="flex flex-row"
          name="frequency"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="daily" id="r1" />
            <Label htmlFor="r1" className="text-white">
              Daily
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hourly" id="r2" />
            <Label htmlFor="r2" className="text-white">
              Hourly
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex gap-4">
        <Input placeholder="example@address.com" name="email" />
        <Button type="submit">Subscribe</Button>
      </div>
    </form>
  );
};

export { SubscriptionForm };
